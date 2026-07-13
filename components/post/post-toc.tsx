import type { TocEntry } from "@/types/post";

type PostTocProps = {
  toc: TocEntry[];
};

export function PostToc({ toc }: PostTocProps) {
  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="surface-panel rounded-lg p-5">
      <p className="eyebrow">本文目录</p>
      <nav aria-label="文章目录" className="mt-4">
        <ul className="space-y-3 text-sm leading-6 text-muted">
          {toc.map((entry) => (
            <li key={entry.id} className={entry.level === 3 ? "pl-4" : ""}>
              <a href={`#${entry.id}`}>{entry.text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
