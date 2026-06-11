// 杭州中考知识库数据 - 直接从SQLite和YAML导出
// 数据来源: hangzhou-zhongkao-advisor 项目

export interface SchoolScore {
  school_name: string;
  campus: string;
  district: string;
  boarding: string;
  score: number | null;
  year: number | null;
}

export interface MiddleSchool {
  id: number;
  name: string;
  district: string;
}

// 2025年高中录取分数线 (排名前20)
const schoolScores: SchoolScore[] = [
  { school_name: "杭州第二中学", campus: "滨江校区", district: "滨江区", boarding: "是", score: 630, year: 2025 },
  { school_name: "杭州学军中学", campus: "西溪校区", district: "西湖区", boarding: "部分床位", score: 629, year: 2025 },
  { school_name: "杭州高级中学", campus: "贡院校区", district: "拱墅区", boarding: "是", score: 627, year: 2025 },
  { school_name: "杭州第十四中学", campus: "凤起校区", district: "拱墅区", boarding: "是", score: 624, year: 2025 },
  { school_name: "杭州学军中学", campus: "紫金港校区", district: "西湖区", boarding: "是", score: 623, year: 2025 },
  { school_name: "杭州第四中学", campus: "下沙校区", district: "钱塘区", boarding: "是", score: 622, year: 2025 },
  { school_name: "浙江大学附属中学", campus: "玉泉校区", district: "西湖区", boarding: "是", score: 620, year: 2025 },
  { school_name: "杭州市长河高级中学", campus: "主校区", district: "滨江区", boarding: "是", score: 619, year: 2025 },
  { school_name: "杭州高级中学", campus: "钱江校区", district: "上城区", boarding: "是", score: 617, year: 2025 },
  { school_name: "杭州师范大学附属中学", campus: "主校区", district: "西湖区", boarding: "是", score: 617, year: 2025 },
  { school_name: "杭州第十四中学", campus: "康桥校区", district: "拱墅区", boarding: "是", score: 614, year: 2025 },
  { school_name: "杭州学军中学", campus: "海创园校区", district: "余杭区", boarding: "是", score: 614, year: 2025 },
  { school_name: "杭州第二中学", campus: "东河校区", district: "上城区", boarding: "否", score: 611, year: 2025 },
  { school_name: "杭州市源清中学", campus: "主校区", district: "拱墅区", boarding: "是", score: 609, year: 2025 },
  { school_name: "杭州高级中学", campus: "钱塘学校", district: "钱塘区", boarding: "是", score: 607, year: 2025 },
  { school_name: "浙江大学附属中学", campus: "丁兰校区", district: "上城区", boarding: "部分床位", score: 606, year: 2025 },
  { school_name: "杭州第四中学", campus: "江东学校", district: "钱塘区", boarding: "是", score: 605, year: 2025 },
  { school_name: "杭州第二中学", campus: "富春学校", district: "富阳区", boarding: "是", score: 603, year: 2025 },
  { school_name: "杭州师范大学附属第二中学", campus: "主校区", district: "西湖区", boarding: "是", score: 600, year: 2025 },
  { school_name: "杭州市长河第二高级中学", campus: "主校区", district: "滨江区", boarding: "是", score: 598, year: 2025 },
];

// 2026年中考关键参数
export const keyParams2026 = {
  totalStudents: 44000,
  totalStudentsIncrease: 3100,
  allocationQuotaTotal: 9021,
  allocationRatio: 20.5,
  allocationRatioPrev: 19.4,
  allocationIncrease: 1017,
  top3AllocationRatio: 3.2,
  firstTierLine2025: 563,
  firstTierPredicted2026: 565,
  secondTierLine: 280,
  totalScore: 650,
  pudongDegreeRatio: 73,
  newSchools2026: [
    { name: "杭二高新", group: "杭二中教育集团", totalPlan: 864, allocationQuota: 346, predictedScore: 603 },
    { name: "浙大附实验", group: "浙大附中教育集团", totalPlan: 672, allocationQuota: 269, predictedScore: 598 },
  ],
};

// 初三学校列表
export const middleSchools: MiddleSchool[] = [
  { id: 1, name: "杭州文澜中学", district: "拱墅区" },
  { id: 2, name: "杭州建兰中学", district: "上城区" },
  { id: 3, name: "杭州育才中学", district: "拱墅区" },
  { id: 4, name: "杭州公益中学", district: "西湖区" },
  { id: 5, name: "杭州采荷实验学校", district: "上城区" },
  { id: 6, name: "杭州锦绣中学", district: "拱墅区" },
  { id: 7, name: "杭州启正中学", district: "下城区" },
  { id: 8, name: "杭州观成实验学校", district: "下城区" },
  { id: 9, name: "杭州第十三中学", district: "西湖区" },
  { id: 10, name: "杭州保俶塔实验学校", district: "西湖区" },
  { id: 11, name: "杭州江南实验学校", district: "滨江区" },
  { id: 12, name: "杭州高新实验学校", district: "滨江区" },
  { id: 13, name: "杭州文海实验学校", district: "钱塘区" },
  { id: 14, name: "杭州学军中学教育集团文渊中学", district: "萧山区" },
  { id: 15, name: "杭州二中白马湖学校", district: "滨江区" },
  { id: 16, name: "杭州养正学校", district: "钱塘区" },
  { id: 17, name: "杭州绿城育华学校", district: "西湖区" },
];

// 录取分数线排名
export function getSchoolTiers() {
  const sorted = [...schoolScores].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  return {
    top3: sorted.slice(0, 3).map(s => `${s.school_name}(${s.campus}) ${s.score}分`),
    top8: sorted.slice(3, 8).map(s => `${s.school_name}(${s.campus}) ${s.score}分`),
    others: sorted.slice(8, 15).map(s => `${s.school_name}(${s.campus}) ${s.score}分`),
  };
}

// 搜索高中
export function searchSchools(keyword: string): SchoolScore[] {
  return schoolScores.filter(s =>
    s.school_name.includes(keyword) ||
    s.campus?.includes(keyword) ||
    s.district?.includes(keyword)
  );
}

// 获取知识库文本（用于系统提示词注入）
export function getKnowledgeContext(): string {
  const tiers = getSchoolTiers();
  const params = keyParams2026;

  return `【2026年杭州中考关键数据】
• 总考生: ${params.totalStudents}人(+${params.totalStudentsIncrease})
• 分配生: ${params.allocationQuotaTotal}人(占比${params.allocationRatio}%)
• 预测一段线: ${params.firstTierPredicted2026}分(满分${params.totalScore})
• 新增高中: 杭二高新(预测${params.newSchools2026[0].predictedScore}分)、浙大附实验(预测${params.newSchools2026[1].predictedScore}分)

【2025年高中录取分数线 - 前三所】
${tiers.top3.map((s, i) => `${i+1}. ${s}`).join('\n')}

【前八所（优高）】
${tiers.top8.map((s, i) => `${i+4}. ${s}`).join('\n')}

【第9-15名】
${tiers.others.map((s, i) => `${i+9}. ${s}`).join('\n')}

【填报策略建议】
• 冲稳保: 冲上浮3-5分、稳相当于当前分数、保下调5-10分
• 分配生: 2026年分配生占比提高至${params.allocationRatio}%，更多学生可通过分配生上重高
• 新学校: 2026年新增杭二高新和浙大附实验，提供更多优质学位`;
}
