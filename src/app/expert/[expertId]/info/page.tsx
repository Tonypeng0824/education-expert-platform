"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Info, Loader2 } from "lucide-react";

interface FieldConfig {
  key: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

const zhongkaoFields: FieldConfig[] = [
  { key: "name", label: "学生姓名", placeholder: "请输入学生姓名", required: true },
  { key: "gender", label: "性别", type: "select", options: ["男", "女"], required: true },
  { key: "school", label: "就读学校", placeholder: "如：杭州学军中学", required: true },
  { key: "rank", label: "校内排名", placeholder: "如：50", required: true },
  { key: "totalStudents", label: "年级总人数", placeholder: "如：400", required: true },
  { key: "scoreChinese", label: "语文成绩", placeholder: "如：110", required: true },
  { key: "scoreMath", label: "数学成绩", placeholder: "如：115", required: true },
  { key: "scoreEnglish", label: "英语成绩", placeholder: "如：108", required: true },
  { key: "scoreScience", label: "科学成绩", placeholder: "如：150", required: true },
  { key: "scoreSocial", label: "社会成绩", placeholder: "如：90", required: true },
  { key: "scoreSport", label: "体育成绩", placeholder: "如：28", required: true },
  { key: "goals", label: "目标高中", placeholder: "如：学军、杭高、杭二", required: false },
  { key: "concerns", label: "主要担忧", placeholder: "如：怕滑档、选住宿还是走读", required: false },
  { key: "additionalInfo", label: "补充信息", placeholder: "其他想告诉专家的信息", required: false },
];

const gaokaoFields: FieldConfig[] = [
  { key: "name", label: "学生姓名", placeholder: "请输入学生姓名", required: true },
  { key: "gender", label: "性别", type: "select", options: ["男", "女"], required: true },
  { key: "school", label: "就读学校", placeholder: "如：杭州学军中学", required: true },
  { key: "subjectCombo", label: "选科组合", type: "select", options: ["物化生", "物化地", "物化政", "物生地", "物生政", "史地政", "史地生", "史政生", "其他"], required: true },
  { key: "rank", label: "校内排名", placeholder: "如：50", required: true },
  { key: "totalStudents", label: "年级总人数", placeholder: "如：500", required: true },
  { key: "scoreChinese", label: "语文成绩", placeholder: "如：115", required: true },
  { key: "scoreMath", label: "数学成绩", placeholder: "如：125", required: true },
  { key: "scoreEnglish", label: "英语成绩", placeholder: "如：110", required: true },
  { key: "scorePhysics", label: "物理/历史成绩", placeholder: "根据选科填写", required: true },
  { key: "scoreChemBio", label: "化学/生物/政治/地理", placeholder: "第二赋分科目", required: true },
  { key: "scoreThird", label: "第三赋分科目", placeholder: "根据选科填写", required: false },
  { key: "scoreTotal", label: "总分（含赋分）", placeholder: "如：610", required: true },
  { key: "goals", label: "目标专业/方向", placeholder: "如：计算机、医学、金融", required: false },
  { key: "concerns", label: "主要担忧", placeholder: "如：分数边缘怕滑档", required: false },
  { key: "additionalInfo", label: "补充信息", placeholder: "其他想告诉专家的信息", required: false },
];

const expertConfigs: Record<string, { name: string; fields: FieldConfig[]; tips: string[] }> = {
  "hangzhou-zhongkao": {
    name: "杭州中考规划专家",
    fields: zhongkaoFields,
    tips: [
      "请提供准确的校内排名",
      "说明最近两次模拟考成绩",
      "明确目标高中（冲、稳、保）",
      "如有竞赛获奖或特长生资格请注明",
    ],
  },
  "zhejiang-gaokao": {
    name: "浙江学业规划专家",
    fields: gaokaoFields,
    tips: [
      "请说明当前选科组合（9选3）",
      "提供最近考试成绩和排名",
      "告知感兴趣的专业方向",
      "说明预计报考区域（杭州/省内/省外）",
    ],
  },
};

export default function InfoPage({ params }: { params: Promise<{ expertId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const config = expertConfigs[resolvedParams.expertId];
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">专家不存在</p>
          <Link href="/" className="text-blue-600 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    config.fields.forEach((field) => {
      if (field.required && !formData[field.key]?.trim()) {
        newErrors[field.key] = `请填写${field.label}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    
    // Store form data in sessionStorage for chat page
    sessionStorage.setItem(
      `expert_${resolvedParams.expertId}_info`,
      JSON.stringify(formData)
    );
    
    router.push(`/expert/${resolvedParams.expertId}/chat`);
  };

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/expert`}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{config.name}</h1>
              <p className="text-sm text-gray-500">请填写学生基本信息</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 mb-1">填写提示</p>
              <ul className="text-xs text-yellow-700 space-y-0.5">
                {config.tips.map((tip) => (
                  <li key={tip}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {config.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {field.type === "select" ? (
                <select
                  value={formData[field.key] || ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors[field.key] ? "border-red-400" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white`}
                >
                  <option value="">请选择</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData[field.key] || ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors[field.key] ? "border-red-400" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors`}
                />
              )}
              {errors[field.key] && (
                <p className="text-xs text-red-500 mt-1">{errors[field.key]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`px-10 py-3 rounded-xl font-medium text-white transition-all inline-flex items-center gap-2 ${
              submitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                处理中...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                提交信息，开始咨询
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
