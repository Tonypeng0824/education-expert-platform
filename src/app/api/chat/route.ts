import { NextResponse } from 'next/server';
import { getKnowledgeContext as getZhongkaoContext } from '@/lib/zhongkao-data';
import { getGaokaoContext } from '@/lib/gaokao-data';

// ✅ Vercel 函数超时设置（秒）
export const maxDuration = 30;

// ✅ 只从环境变量读取，无硬编码默认值
const XUNFEI_API_KEY = process.env.XUNFEI_API_KEY;
const BASE_URL = process.env.XUNFEI_BASE_URL || "https://maas-api.cn-huabei-1.xf-yun.com/v2";
const MODEL_ID = process.env.XUNFEI_MODEL_ID || "xopqwen36v35b";

// 启动时校验
if (!XUNFEI_API_KEY) {
  console.error("❌ 缺少 XUNFEI_API_KEY 环境变量");
}

const systemPrompts: Record<string, string> = {
  "hangzhou-zhongkao": `你是杭州中考规划专家，拥有近20年杭州中考志愿填报经验。

你的职责：
1. 根据学生成绩和排名，提供精准的志愿填报建议
2. 解读杭州中考最新政策（一段线、重高线、县中招生等）
3. 分析各高中录取分数线和招生计划
4. 帮助学生制定"冲稳保"志愿策略

注意事项：
- 所有建议需基于杭州中考现行政策和历史数据
- 尊重学生和家长的选择，提供客观分析
- 不保证录取结果，只提供专业建议

【知识库参考数据】
${getZhongkaoContext()}

请结合以上数据为学生提供专业建议。回答时请引用相关数据来源。`,

  "zhejiang-gaokao": `你是浙江学业规划专家，精通浙江新高考3+3选科模式和志愿填报规则。

你的职责：
1. 指导学生进行科学选科（9选3组合分析）
2. 提供浙江高考一段线/二段线志愿填报建议
3. 分析各专业大类就业前景和报考难度
4. 帮助制定高考备考策略

注意事项：
- 所有建议基于浙江教育考试院最新政策
- 考虑学生兴趣、优势和职业规划
- 不给出绝对化的报考建议

【知识库参考数据】
${getGaokaoContext()}

请结合以上数据为学生提供专业建议。回答时请引用相关数据来源。`,
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  const startTime = Date.now();

  // ✅ 调试日志（不暴露 API Key）
  console.log('[Chat API] Config check:', {
    hasApiKey: !!XUNFEI_API_KEY,
    baseUrl: BASE_URL,
    modelId: MODEL_ID,
    nodeEnv: process.env.NODE_ENV,
  });

  // ✅ 提前校验 API Key
  if (!XUNFEI_API_KEY) {
    return NextResponse.json(
      { error: '服务器未配置 API 密钥，请联系管理员' },
      { status: 500 }
    );
  }

  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: '请求过于频繁，请稍后再试' }, { status: 429 });
    }

    const { messages, systemPrompt, expertId } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: '消息列表不能为空' }, { status: 400 });
    }

    // Use expert-specific system prompt or fallback
    const effectiveSystemPrompt = expertId && systemPrompts[expertId]
      ? systemPrompts[expertId]
      : (systemPrompt || '你是一个专业的教育规划专家助手。');

    const allMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: effectiveSystemPrompt },
      ...messages,
    ];

    // Try up to 3 times with exponential backoff
    let lastError: string | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        console.log(`Retry attempt ${attempt + 1} after Engine Busy...`);
      }

      try {
        // ✅ 使用流式响应避免超时
        const xunfeiResponse = await fetch(`${BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${XUNFEI_API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL_ID,
            messages: allMessages,
            stream: true,  // ✅ 启用流式
            temperature: 0.7,
            max_tokens: 4096,
          }),
        });

        // Handle errors
        if (!xunfeiResponse.ok) {
          const errorData = await xunfeiResponse.json().catch(() => ({}));
          const errorCode = errorData?.error?.code || errorData?.code || '';
          const errorMsg = errorData?.error?.message || errorData?.message || xunfeiResponse.statusText;

          // Engine busy - retry
          if ((errorCode === '10110' || errorCode === '10010' || 
               errorMsg.includes('Engine Busy') || errorMsg.includes('Engine is busy')) && attempt < 2) {
            lastError = `引擎繁忙 (重试 ${attempt + 1}/3)`;
            continue;
          }

          // Other errors - return immediately
          const elapsed = Date.now() - startTime;
          return NextResponse.json({
            error: errorMsg || 'API请求失败',
            code: errorCode,
            elapsed,
            debug: { modelId: MODEL_ID, baseUrl: BASE_URL },
          }, { status: xunfeiResponse.ok ? 200 : 500 });
        }

        // ✅ 返回流式响应（直接转发讯飞的 SSE 流）
        return new NextResponse(xunfeiResponse.body, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      } catch (fetchError: any) {
        lastError = fetchError.message;
        if (attempt < 2) continue;
      }
    }

    return NextResponse.json(
      { error: `请求失败，已重试3次: ${lastError}` },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '服务器错误' },
      { status: 500 }
    );
  }
}
