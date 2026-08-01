import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { PostToc } from "@/components/post/post-toc";
import type {
  InterviewDocument,
  InterviewDocumentSummary,
} from "@/lib/interviews";
import { renderMdx } from "@/lib/mdx";

type InterviewDocumentViewProps = {
  document: InterviewDocument;
  documents: InterviewDocumentSummary[];
};

function getDocumentHref(slug: string) {
  return slug === "index" ? "/interviews" : `/interviews/${slug}`;
}

export async function InterviewDocumentView({
  document,
  documents,
}: InterviewDocumentViewProps) {
  const content = await renderMdx(document.content);
  const currentIndex = documents.findIndex((item) => item.slug === document.slug);
  const previous = currentIndex > 0 ? documents[currentIndex - 1] : null;
  const next = currentIndex >= 0 ? documents[currentIndex + 1] : null;

  return (
    <article className="min-w-0 space-y-7">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag-chip">仅本地</span>
          <span className="text-sm text-muted">{document.group}</span>
        </div>
        <h1 className="text-3xl font-semibold text-strong sm:text-4xl">
          {document.title}
        </h1>
      </header>

      <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0">
          <div className="surface-panel rounded-lg px-5 py-7 sm:px-9 sm:py-9">
            <div className="post-content">{content}</div>
          </div>

          <nav
            aria-label="相邻面试资料"
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                className="button-secondary justify-start gap-2"
                href={getDocumentHref(previous.slug)}
              >
                <ArrowLeft aria-hidden="true" size={17} />
                <span className="truncate">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                className="button-secondary justify-end gap-2"
                href={getDocumentHref(next.slug)}
              >
                <span className="truncate">{next.title}</span>
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            ) : null}
          </nav>
        </div>

        {document.toc.length > 0 ? (
          <aside className="xl:sticky xl:top-24 xl:self-start">
            <PostToc toc={document.toc} />
          </aside>
        ) : null}
      </div>
    </article>
  );
}
