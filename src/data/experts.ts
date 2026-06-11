export interface StudentInfo {
  name: string;
  gender: 'male' | 'female';
  school: string;
  rank: string;
  totalStudents: string;
  subjectScores: {
    chinese: string;
    math: string;
    english: string;
    science: string;
    social: string;
    sport: string;
    total: string;
  };
  selectedSubject?: string;  // For gaokao
  gaokaoTotal?: string;
  gaokaoRank?: string;
  goals: string[];
  concerns: string[];
  additionalInfo: string;
}

export interface ExpertConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  systemPrompt: string;
  requiredFields: string[];
  tips: string[];
}

export const experts: ExpertConfig[] = [
  {
    id: 'hangzhou-zhongkao',
    name: '杭州中考规划专家',
    description: '专注杭州中考志愿填报，20+所高中3梯队知识库',
    icon: '🎓',
    color: '#3b82f6',
    systemPrompt: `你是杭州中考规划专家，拥有近20年杭州中考志愿填报经验。

你的职责：
1. 根据学生成绩和排名，提供精准的志愿填报建议
2. 解读杭州中考最新政策（一段线、重高线、县中招生等）
3. 分析各高中录取分数线和招生计划
4. 帮助学生制定"冲稳保"志愿策略

注意事项：
- 所有建议需基于杭州中考现行政策和历史数据
- 尊重学生和家长的选择，提供客观分析
- 不保证录取结果，只提供专业建议`,
    requiredFields: ['name', 'gender', 'school', 'rank', 'totalStudents', 'subjectScores'],
    tips: [
      '请提供准确的校内排名',
      '说明最近两次模拟考成绩',
      '明确目标高中（冲、稳、保）',
      '告知是否有意向的住宿/走读'
    ]
  },
  {
    id: 'zhejiang-gaokao',
    name: '浙江学业规划专家',
    description: '浙江新高考选科指导与志愿填报规划',
    icon: '📚',
    color: '#8b5cf6',
    systemPrompt: `你是浙江学业规划专家，精通浙江新高考3+3选科模式和志愿填报规则。

你的职责：
1. 指导学生进行科学选科（9选3组合分析）
2. 提供浙江高考一段线/二段线志愿填报建议
3. 分析各专业大类就业前景和报考难度
4. 帮助制定高考备考策略

注意事项：
- 所有建议基于浙江教育考试院最新政策
- 考虑学生兴趣、优势和职业规划
- 不给出绝对化的报考建议`,
    requiredFields: ['name', 'gender', 'school', 'selectedSubject', 'gaokaoTotal', 'gaokaoRank'],
    tips: [
      '请说明当前选科组合（9选3）',
      '提供最近考试成绩和排名',
      '告知感兴趣的专业方向',
      '说明预计报考区域（杭州/省内/省外）'
    ]
  }
];

export function getExpert(id: string): ExpertConfig | undefined {
  return experts.find(e => e.id === id);
}
