"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, GraduationCap, BookOpen } from "lucide-react";
import { experts } from "@/data/experts";

export default function ExpertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const expertId = params.expertId as string;
  const expert = experts.find((e) => e.id === expertId);

  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            未找到该专家
          </h1>
          <Link href="/" className="text-blue-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = expert.id === "hangzhou-zhongkao" ? GraduationCap : BookOpen;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            专家咨询
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Expert Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, ${expert.color}, ${expert.color}dd)` }}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {expert.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {expert.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {expert.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: `${expert.color}15`,
                      color: expert.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              咨询前请准备：
            </h3>
            <ul className="space-y-1">
              {expert.tips.map((tip, i) => (
                <li key={i} className="text-sm text-yellow-700 dark:text-yellow-400 flex items-start gap-2">
                  <span>{i + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Link
            href={`/expert/${expertId}/info`}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
            style={{ backgroundColor: expert.color }}
          >
            <Sparkles className="w-5 h-5" />
            开始咨询
          </Link>
        </div>

        {/* Knowledge Base Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            专家知识库涵盖
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {expert.id === "hangzhou-zhongkao" ? (
              <>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
                  📊 2023-2025 杭州中考录取分数线
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
                  🏫 21 所高中梯队分析
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
                  📋 分配生政策与计算方法
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
                  🎯 冲稳保策略建议
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm">
                  📚 16 个专业大类详解
                </div>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm">
                  🔀 8 种升学路径对比
                </div>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm">
                  💼 7 个行业就业前景
                </div>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm">
                  🧩 选科要求与职业规划
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
