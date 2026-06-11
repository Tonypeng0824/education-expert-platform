import type { Metadata } from "next";
import "@/globals.css";

export const metadata: Metadata = {
  title: "教育专家团队平台",
  description: "杭州中考与浙江学业规划专家团队",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
