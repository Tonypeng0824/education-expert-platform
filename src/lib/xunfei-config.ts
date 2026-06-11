export const xunfeiConfig = {
  apiKey: process.env.XUNFEI_API_KEY!,
  baseUrl: process.env.XUNFEI_BASE_URL || "https://maas-api.cn-huabei-1.xf-yun.com/v2",
  modelId: process.env.XUNFEI_MODEL_ID || "xopqwen36v35b",
};

// 启动时报错提醒
if (!process.env.XUNFEI_API_KEY) {
  console.error(
    "\n❌ 缺少环境变量 XUNFEI_API_KEY！\n" +
    "请在 .env.local 中配置，或前往 Vercel Dashboard 设置环境变量。\n"
  );
}
