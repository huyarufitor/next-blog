import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InterviewSidebar } from "@/components/interview/interview-sidebar";
import {
  getAllInterviewDocuments,
  isInterviewReaderEnabled,
} from "@/lib/interviews";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "本地面试资料",
  description: "仅在本地开发环境使用的前端面试资料阅读器。",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function InterviewsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!isInterviewReaderEnabled()) notFound();

  const documents = await getAllInterviewDocuments();
  if (documents.length === 0) notFound();

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
      <InterviewSidebar documents={documents} />
      <main className="interview-reader min-w-0">{children}</main>
    </div>
  );
}
