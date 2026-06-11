// 浙江高考知识库数据 - 从SQLite和YAML知识库导出
// 数据来源: zhejiang-gaokao-advisor 项目

// 2026年高考分数线
export const scoreLines2026 = {
  firstTierLine: 595,  // 一段线
  secondTierLine: 490, // 二段线
  specialTypes: [
    { name: "特殊类型招生控制线", score: 595 },
    { name: "体育类一段线", score: 530 },
    { name: "艺术类（美术）一段线", score: 510 },
  ],
};

export const scoreLines2025 = {
  firstTierLine: 592,
  secondTierLine: 485,
};

export const scoreLines2024 = {
  firstTierLine: 595,
  secondTierLine: 488,
};

// 高考基本政策
export const gaokaoBasicPolicies = {
  examStructure: {
    mandatory: [
      { subject: "语文", fullScore: 150 },
      { subject: "数学", fullScore: 150 },
      { subject: "外语", fullScore: 150, notes: "含听力30分；英语可考2次(1月+6月)" },
    ],
    elective: {
      mode: "7选3",
      options: ["物理", "化学", "生物", "政治", "历史", "地理", "技术"],
      fullScorePerSubject: 100,
      totalCombinations: 35,
      notes: "选考科目可考2次(1月+6月)，取最高分",
    },
    totalFullScore: 750,
  },
  scoring: "等级赋分制（选考科目）",
};

// 选科要求
interface MajorRequirement {
  category: string;
  requirements: string;
  details: string[];
}

export const majorRequirements: MajorRequirement[] = [
  { category: "临床医学", requirements: "物理+化学（绝大多数）", details: ["北大医学部: 物+化", "浙大医学院: 物+化", "温州医科大学: 物+化"] },
  { category: "口腔医学", requirements: "物理+化学", details: ["北大口腔: 物+化", "川大华西: 物+化"] },
  { category: "计算机/软件工程", requirements: "物理（绝大多数）", details: ["浙大计算机: 物理", "杭电计算机: 物理"] },
  { category: "电子信息类", requirements: "物理", details: ["杭电电子信息: 物理"] },
  { category: "人工智能/数据科学", requirements: "物理", details: ["浙大人工智能: 物理"] },
  { category: "机械/自动化", requirements: "物理", details: ["浙大机械: 物理"] },
  { category: "土木工程", requirements: "物理", details: ["浙大土木: 物理"] },
  { category: "化学/化工", requirements: "物理+化学", details: ["浙大化工: 物+化"] },
  { category: "生物/生物工程", requirements: "物理+化学/生物", details: ["浙大生物: 物+化/生"] },
  { category: "法学", requirements: "不限", details: ["浙大法学: 不限"] },
  { category: "金融/经济", requirements: "不限/物理", details: ["浙大金融: 物理", "上财金融: 不限"] },
  { category: "新闻传播", requirements: "不限", details: ["浙大新闻: 不限"] },
  { category: "外语类", requirements: "不限", details: ["北外: 不限"] },
  { category: "师范类（文科方向）", requirements: "不限", details: ["杭师大: 不限"] },
  { category: "师范类（理科方向）", requirements: "物理/化学", details: ["浙师大物理: 物理"] },
  { category: "建筑学", requirements: "物理", details: ["浙大建筑: 物理"] },
];

// 多元升学路径
interface Pathway {
  name: string;
  description: string;
  timing: string;
  requirements: string;
}

export const admissionPathways: Pathway[] = [
  { name: "统一高考（平行录取）", description: "按高考成绩从高到低择优录取，实行专业平行志愿", timing: "6月高考后", requirements: "所有考生均可参加" },
  { name: "三位一体综合评价招生", description: "高考成绩×60% + 校测成绩×30% + 学考成绩×10% 综合评价录取", timing: "2-3月报名，4月校测", requirements: "学考成绩优秀，建议A等3个以上" },
  { name: "强基计划", description: "基础学科招生改革，高考成绩×85% + 校测×15%", timing: "4月报名，6月底校测", requirements: "高考成绩优异，有学科特长者优先" },
  { name: "高职提前招生", description: "高职院校自主选拔录取，学业水平测试+综合素质评价", timing: "3-4月", requirements: "普高或中职均可" },
  { name: "保送生", description: "学科竞赛国家集训队或外语类保送", timing: "12月-2月", requirements: "五项学科竞赛国家集训队或16所外语学校" },
  { name: "高水平运动队", description: "一级运动员以上可申请", timing: "按各校简章", requirements: "一级运动员及以上" },
  { name: "高水平艺术团（少量）", description: "艺术特长显著者可报考", timing: "按各校简章", requirements: "艺术特长突出" },
  { name: "农村专项计划", description: "面向农村和贫困地区考生的专项招生计划", timing: "4月报名", requirements: "符合户籍和学籍要求" },
];

// 行业趋势与就业前景
interface IndustryTrend {
  field: string;
  outlook: string;
  salary: string;
}

export const industryTrends: IndustryTrend[] = [
  { field: "人工智能/大数据", outlook: "持续高需求，算法岗竞争激烈但薪资极高", salary: "应届30-60万(硕士)" },
  { field: "半导体/芯片", outlook: "国产替代驱动，国家战略重点，岗位缺口大", salary: "应届20-40万" },
  { field: "新能源/碳中和", outlook: "政策驱动，光伏/储能/电动车方向持续增长", salary: "应届15-30万" },
  { field: "生物医药", outlook: "创新药研发和CXO方向需求旺盛", salary: "应届12-25万(博士25-45万)" },
  { field: "金融科技", outlook: "量化/NFT/区块链与传统金融结合", salary: "应届20-50万(头部)" },
  { field: "互联网/软件", outlook: "增速放缓，但头部企业需求仍稳", salary: "应届20-40万(大厂)" },
  { field: "智能制造/机器人", outlook: "工业4.0驱动，自动化领域需求增长", salary: "应届15-25万" },
];

// 获取知识库上下文文本
export function getGaokaoContext(): string {
  return `【2026年浙江高考分数线】
• 一段线: ${scoreLines2026.firstTierLine}分
• 二段线: ${scoreLines2026.secondTierLine}分
• 特殊类型招生控制线: ${scoreLines2026.specialTypes[0].score}分
• 2025年一段线: ${scoreLines2025.firstTierLine}分
• 2024年一段线: ${scoreLines2024.firstTierLine}分

【考试模式】
• 总分: ${gaokaoBasicPolicies.examStructure.totalFullScore}分
• 必考: 语文(150) + 数学(150) + 外语(150)
• 选考: 7选3(物理化学生物政治历史地理技术各100分)
• 选考科目实行等级赋分制
• 英语和选考科目均可考2次(1月和6月)

【选科与专业对应关系】
• 临床医学 → 物理+化学（几乎所有医学院要求）
• 计算机/AI/电子信息 → 物理
• 法学/新闻/外语 → 不限
• 金融/经济 → 不限或物理

【多元升学路径】
• 三位一体: 高考60%+校测30%+学考10%，建议学考A等3个以上
• 强基计划: 高考85%+校测15%，适合基础学科优秀者

【热门行业就业前景】
• AI/大数据: 应届30-60万(硕士)
• 芯片/半导体: 应届20-40万
• 新能源: 应届15-30万`;
}
