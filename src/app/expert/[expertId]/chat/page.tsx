"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Loader2, User, Bot, AlertCircle, Home } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
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
- 涉及隐私信息需谨慎处理
- 先了解清楚学生情况，再给出具体建议`,

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
- 保护学生隐私信息
- 先全面了解学生情况，再给出针对性建议`,
};

export default function ChatPage({ params }: { params: Promise<{ expertId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const expertId = resolvedParams.expertId;
  const systemPrompt = systemPrompts[expertId];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<Record<string, string> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load student info from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem(`expert_${expertId}_info`);
    if (stored) {
      try {
        const info = JSON.parse(stored);
        setStudentInfo(info);
        // Build initial message with student info
        const infoSummary = buildInfoSummary(info);
        setMessages([
          {
            role: "assistant",
            content: `您好！我是${expertId === "hangzhou-zhongkao" ? "杭州中考规划专家" : "浙江学业规划专家"}。\n\n我已收到您提交的学生信息，让我先帮您确认一下：\n\n${infoSummary}\n\n请问这些信息是否准确？另外，针对您的情况，有没有具体想了解的问题？比如：\n${expertId === "hangzhou-zhongkao" ? "- 目前成绩能上哪些高中？\n- 冲稳保策略怎么制定？\n- 需要提高哪些科目？" : "- 当前选科组合是否合理？\n- 以目前分数能报考哪些大学？\n- 如何制定备考计划？"}`,
          },
        ]);
      } catch {
        // No valid student info found
      }
    }
  }, [expertId]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const buildInfoSummary = (info: Record<string, string>): string => {
    if (expertId === "hangzhou-zhongkao") {
      return `📋 **学生信息确认**\n• 姓名：${info.name || "未填写"}\n• 性别：${info.gender || "未填写"}\n• 学校：${info.school || "未填写"}\n• 校内排名：${info.rank || "未填写"}/${info.totalStudents || "?"}\n• 语文：${info.scoreChinese || "?"} | 数学：${info.scoreMath || "?"} | 英语：${info.scoreEnglish || "?"}\n• 科学：${info.scoreScience || "?"} | 社会：${info.scoreSocial || "?"} | 体育：${info.scoreSport || "?"}\n• 目标高中：${info.goals || "未说明"}`;
    }
    return `📋 **学生信息确认**\n• 姓名：${info.name || "未填写"}\n• 性别：${info.gender || "未填写"}\n• 学校：${info.school || "未填写"}\n• 选科：${info.subjectCombo || "未填写"}\n• 校内排名：${info.rank || "未填写"}/${info.totalStudents || "?"}\n• 语文：${info.scoreChinese || "?"} | 数学：${info.scoreMath || "?"} | 英语：${info.scoreEnglish || "?"}\n• 总分：${info.scoreTotal || "?"}\n• 目标专业：${info.goals || "未说明"}`;
  };

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    setInput("");
    setError(null);

    const userMessage: Message = { role: "user", content: trimmedInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    // ✅ 25秒超时（Vercel函数30秒，留5秒余量）
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt,
          expertId,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || `请求失败 (${response.status})`);
      }

      if (data.choices && data.choices[0]?.message?.content) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.choices[0].message.content,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("响应格式异常");
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      
      let errorMsg = "网络错误，请稍后重试";
      if (err.name === 'AbortError') {
        errorMsg = "请求超时（25秒）。问题可能较复杂，建议简化后重试，或联系管理员增加超时时间。";
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ 抱歉，${errorMsg}。请稍后重试或重新表述您的问题。`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!systemPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-lg text-red-500 mb-4">未知的专家类型</p>
          <Link href="/" className="text-blue-600 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href={`/expert`}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {expertId === "hangzhou-zhongkao" ? "杭州中考规划专家" : "浙江学业规划专家"}
                </h1>
                <p className="text-xs text-gray-500">在线咨询中</p>
              </div>
            </div>
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="返回首页"
            >
              <Home className="w-5 h-5 text-gray-500" />
            </Link>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 overflow-y-auto">
        {messages.length === 0 ? (
          /* Empty state */
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">未找到学生信息</p>
              <p className="text-sm mt-1">请先返回上一步填写学生信息</p>
              <Link
                href={`/expert/${expertId}/info`}
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                去填写信息
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "user"
                      ? "bg-blue-600"
                      : "bg-gray-700"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-md"
                      : "bg-white border border-gray-200 rounded-tl-md shadow-sm"
                  }`}
                >
                  <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                    {msg.content}
                  </pre>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-500">专家正在思考...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Error banner */}
      {error && (
        <div className="max-w-4xl mx-auto w-full px-4 mb-2">
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-xs text-red-600">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入您的问题，按 Enter 发送..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className={`p-3 rounded-xl transition-all ${
                !input.trim() || loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            按 Enter 发送 · Shift + Enter 换行
          </p>
        </div>
      </div>
    </div>
  );
}
