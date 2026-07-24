"use client";

import { useState } from "react";
import Link from "next/link";

import { buildSearch } from "@/lib/search";
import type { SearchDocument } from "@/types/post";

type SearchPanelProps = {
  documents: SearchDocument[];
};

export function SearchPanel({ documents }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [search] = useState(() => buildSearch(documents));

  const results =
    query.trim().length === 0
      ? documents.slice(0, 6).map((document) => ({
          slug: document.slug,
          kind: document.kind,
          url: document.url,
          title: document.title,
          summary: document.summary,
          date: document.date,
          formattedDate: document.formattedDate,
          category: document.category,
          categorySlug: document.categorySlug,
          tags: document.tags,
        }))
      : search.search(query).map((match) => ({
          slug: match.slug as string,
          kind: match.kind as "post" | "note",
          url: match.url as string,
          title: match.title as string,
          summary: match.summary as string,
          date: match.date as string,
          formattedDate: match.formattedDate as string,
          category: match.category as string,
          categorySlug: match.categorySlug as string,
          tags:
            typeof match.tags === "string"
              ? match.tags.split(" ").filter(Boolean)
              : [],
        }));

  return (
    <div className="space-y-6">
      <div className="surface-panel rounded-lg p-5">
        <input
          aria-label="搜索文章"
          className="w-full border-0 bg-transparent text-lg text-strong outline-none placeholder:text-muted"
          placeholder="按标题、摘要、分类、标签或正文搜索"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {query.trim().length === 0
          ? `当前显示 ${results.length} 篇文章`
          : `找到 ${results.length} 篇相关文章`}
      </p>

      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((result) => (
            <article
              key={`${result.kind}:${result.slug}`}
              className="surface-panel rounded-lg p-6"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <span>{result.formattedDate}</span>
                <span aria-hidden="true">/</span>
                {result.kind === "post" && result.categorySlug ? (
                  <Link href={`/categories/${result.categorySlug}`}>{result.category}</Link>
                ) : (
                  <span>{result.category}</span>
                )}
                <span aria-hidden="true">/</span>
                <span>{result.tags.join(", ")}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-strong">
                <Link href={result.url}>{result.title}</Link>
              </h2>
              <p className="mt-3 text-base leading-7 text-muted">
                {result.summary}
              </p>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
            没有找到匹配的文章。
          </div>
        )}
      </div>
    </div>
  );
}
