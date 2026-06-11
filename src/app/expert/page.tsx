"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, UserPlus } from "lucide-react";
import Link from "next/link";

interface Expert {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  tags: string[];
  tips: string[];
}

const experts: Expert[] = [
  {
    id: "hangzhou-zhongkao",
    name: "杭州中考规划专家",
    icon: "🎓",
    color: "#3b82f6",
    description: "专注杭州中考志愿填报，覆盖21所高中3梯队知识库",
    tags: ["一段线分析", "重高线解读", "冲稳保策略", "政策解读"],
    tips: [
      "请提供准确的校内排名",
      "说明最近两次模拟考成绩",
      "明确目标高中（冲、稳、保）",
    ],
  },
  {
    id: "zhejiang-gaokao",
    name: "浙江学业规划专家",
    icon: "📚",
    color: "#8b5cf6",
    description: "浙江新高考选科指导与志愿填报规划",
    tags: ["9选3组合", "3+3模式", "志愿填报", "选科指导"],
    tips: [
      "请说明当前选科组合（9选3）",
      "提供最近考试成绩和排名",
      "告知感兴趣的专业方向",
    ],
  },
];

export default function ExpertSelectionPage() {
  const router = useRouter();
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);

  const handleSelect = (expertId: string) => {
    setSelectedExpert(expertId);
  };

  const handleContinue = () => {
    if (selectedExpert) {
      router.push(`/expert/${selectedExpert}/info`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">选择您的专属规划专家</h1>
              <p className="text-sm text-gray-500">
                请选择需要咨询的专家类型
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {experts.map((expert) => (
            <div
              key={expert.id}
              onClick={() => handleSelect(expert.id)}
              className={`cursor-pointer rounded-2xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                selectedExpert === expert.id
                  ? "border-blue-500 shadow-md bg-blue-50/50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: `${expert.color}15` }}
                >
                  {expert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {expert.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {expert.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {expert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selection indicator */}
              <div className="mt-4 flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedExpert === expert.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedExpert === expert.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                {selectedExpert === expert.id && (
                  <span className="text-sm text-blue-600 font-medium">
                    已选择
                  </span>
                )}
              </div>

              {/* Tips */}
              {selectedExpert === expert.id && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-700 font-medium mb-1">
                    咨询前请准备：
                  </p>
                  <ul className="text-xs text-yellow-600 space-y-0.5">
                    {expert.tips.map((tip) => (
                      <li key={tip}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedExpert}
            className={`px-8 py-3 rounded-xl font-medium text-white transition-all ${
              selectedExpert
                ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            继续 - 填写学生信息
          </button>
        </div>
      </main>
    </div>
  );
}
