"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, Sparkles, Sun, Moon, Info } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    教育专家团队平台
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    专业学业规划 · 精准志愿指导
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="切换主题"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              选择您的专属规划专家
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              平台拥有杭州中考和浙江学业规划两位专业专家，为您提供精准的升学指导服务
            </p>
          </section>

          {/* Expert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Hangzhou Zhongkao Card */}
            <Link
              href="/expert/hangzhou-zhongkao"
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-2 border-blue-100 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full -translate-y-16 translate-x-16 opacity-50" />
                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        杭州中考规划专家
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        专注杭州中考志愿填报
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    覆盖21所高中3梯队知识库，根据学生成绩排名提供精准的志愿填报建议，解读杭州中考最新政策。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["一段线分析", "重高线解读", "冲稳保策略", "政策解读"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                    <span>开始咨询</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Zhejiang Gaokao Card */}
            <Link
              href="/expert/zhejiang-gaokao"
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-2 border-purple-100 dark:border-purple-900 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 dark:bg-purple-900/30 rounded-full -translate-y-16 translate-x-16 opacity-50" />
                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        浙江学业规划专家
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        新高考选科与志愿填报
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    精通浙江新高考3+3选科模式，指导学生科学选科，提供志愿填报建议和备考策略。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["9选3组合", "3+3模式", "志愿填报", "选科指导"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium">
                    <span>开始咨询</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Info Section */}
          <section className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                  使用须知
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                  <li>• 请如实填写学生信息，以便专家提供精准建议</li>
                  <li>• 所有对话内容仅用于升学规划参考，不保证录取结果</li>
                  <li>• 涉及隐私信息将严格保密</li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>教育专家团队平台 © 2026 | 专业学业规划 · 精准志愿指导</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
