import { notFound } from "next/navigation";

import { InterviewDocumentView } from "@/components/interview/interview-document";
import {
  getAllInterviewDocuments,
  getInterviewDocument,
  isInterviewReaderEnabled,
} from "@/lib/interviews";

type InterviewDetailPageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamic = "force-dynamic";

export default async function InterviewDetailPage({
  params,
}: InterviewDetailPageProps) {
  if (!isInterviewReaderEnabled()) notFound();

  const { slug } = await params;
  const [document, documents] = await Promise.all([
    getInterviewDocument(slug),
    getAllInterviewDocuments(),
  ]);

  if (!document) notFound();

  return <InterviewDocumentView document={document} documents={documents} />;
}
