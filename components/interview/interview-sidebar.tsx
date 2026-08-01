import {
  BookOpenText,
  ChevronDown,
  FileText,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";

import type { InterviewDocumentSummary } from "@/lib/interviews";

type InterviewSidebarProps = {
  documents: InterviewDocumentSummary[];
};

function getDocumentHref(slug: string) {
  return slug === "index" ? "/interviews" : `/interviews/${slug}`;
}

export function InterviewSidebar({ documents }: InterviewSidebarProps) {
  const groups = Map.groupBy(documents, (document) => document.group);
  const navigationGroups = [...groups.entries()].map(
    ([group, groupDocuments]) => (
      <section key={group}>
        <p className="px-2 text-xs font-semibold text-muted">{group}</p>
        <div className="mt-2 space-y-1">
          {groupDocuments.map((document) => (
            <Link
              className="flex items-start gap-2 rounded-md px-2 py-2 text-sm leading-5 text-muted transition-colors hover:bg-subtle hover:text-strong"
              href={getDocumentHref(document.slug)}
              key={document.slug}
            >
              <FileText
                aria-hidden="true"
                className="mt-0.5 shrink-0"
                size={15}
              />
              <span>{document.title}</span>
            </Link>
          ))}
        </div>
      </section>
    ),
  );

  return (
    <aside className="surface-panel rounded-lg p-4 lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-inverse text-inverse-text">
            <BookOpenText aria-hidden="true" size={18} />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-strong">面试资料</p>
            <p className="text-xs text-muted">本地阅读器</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted">
          <LockKeyhole aria-hidden="true" size={13} />
          仅本地
        </span>
      </div>

      <details className="group mt-3 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-md bg-subtle px-3 py-2 text-sm font-medium text-strong">
          选择资料
          <ChevronDown
            aria-hidden="true"
            className="transition-transform group-open:rotate-180"
            size={16}
          />
        </summary>
        <nav
          aria-label="移动端面试资料导航"
          className="mt-4 max-h-[55vh] space-y-5 overflow-y-auto pr-1"
        >
          {navigationGroups}
        </nav>
      </details>

      <nav
        aria-label="面试资料导航"
        className="mt-4 hidden max-h-[65vh] space-y-5 overflow-y-auto pr-1 lg:block"
      >
        {navigationGroups}
      </nav>
    </aside>
  );
}
