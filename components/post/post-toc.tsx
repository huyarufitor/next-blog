import { ChevronDown } from "lucide-react";

import type { TocEntry } from "@/types/post";

type PostTocProps = {
  toc: TocEntry[];
};

type TocGroup = {
  heading: TocEntry;
  children: TocEntry[];
};

function groupToc(toc: TocEntry[]) {
  return toc.reduce<TocGroup[]>((groups, entry) => {
    const currentGroup = groups.at(-1);

    if (entry.level === 3 && currentGroup?.heading.level === 2) {
      currentGroup.children.push(entry);
      return groups;
    }

    groups.push({ heading: entry, children: [] });
    return groups;
  }, []);
}

export function PostToc({ toc }: PostTocProps) {
  if (toc.length === 0) {
    return null;
  }

  return (
    <details className="surface-panel group/toc rounded-lg" open>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 [&::-webkit-details-marker]:hidden">
        <span className="eyebrow">本文目录</span>
        <ChevronDown
          aria-hidden="true"
          className="shrink-0 transition-transform group-open/toc:rotate-180"
          size={16}
        />
      </summary>

      <nav
        aria-label="文章目录"
        className="max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain px-5 pb-5"
      >
        <ul className="space-y-3 border-t border-border pt-4 text-sm leading-6 text-muted">
          {groupToc(toc).map(({ heading, children }) => (
            <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
              {children.length > 0 ? (
                <details className="group/section">
                  <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_1rem] items-start gap-2 font-medium text-strong [&::-webkit-details-marker]:hidden">
                    <a href={`#${heading.id}`}>{heading.text}</a>
                    <ChevronDown
                      aria-hidden="true"
                      className="mt-1 transition-transform group-open/section:rotate-180"
                      size={16}
                    />
                  </summary>
                  <ul className="mt-2 space-y-2 border-l border-border pl-4">
                    {children.map((entry) => (
                      <li key={entry.id}>
                        <a href={`#${entry.id}`}>{entry.text}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <a href={`#${heading.id}`}>{heading.text}</a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
