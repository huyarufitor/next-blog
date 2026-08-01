import { notFound } from "next/navigation";

import { InterviewDocumentView } from "@/components/interview/interview-document";
import {
  getAllInterviewDocuments,
  getInterviewDocument,
  isInterviewReaderEnabled,
} from "@/lib/interviews";

export const dynamic = "force-dynamic";

export default async function InterviewsPage() {
  if (!isInterviewReaderEnabled()) notFound();

  const [document, documents] = await Promise.all([
    getInterviewDocument(["index"]),
    getAllInterviewDocuments(),
  ]);

  if (!document) notFound();

  return <InterviewDocumentView document={document} documents={documents} />;
}
