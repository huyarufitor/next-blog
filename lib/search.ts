import MiniSearch from "minisearch";

import type { SearchDocument } from "@/types/post";

type IndexedSearchDocument = Omit<SearchDocument, "tags"> & {
  tags: string;
};

let chineseSegmenter: Intl.Segmenter | null | undefined;

function getChineseSegmenter() {
  if (chineseSegmenter !== undefined) {
    return chineseSegmenter;
  }

  chineseSegmenter =
    typeof Intl !== "undefined" && typeof Intl.Segmenter === "function"
      ? new Intl.Segmenter("zh-CN", { granularity: "word" })
      : null;

  return chineseSegmenter;
}

function getChineseBigrams(text: string) {
  const groups = text.match(/\p{Script=Han}+/gu) ?? [];

  return groups.flatMap((group) =>
    group.length < 2
      ? [group]
      : Array.from({ length: group.length - 1 }, (_, index) =>
          group.slice(index, index + 2),
        ),
  );
}

function tokenizeWithoutSegmenter(text: string) {
  const normalizedText = text.toLocaleLowerCase("zh-CN");
  const groups = normalizedText.match(/[\p{L}\p{N}]+/gu) ?? [];

  return [...new Set([...groups, ...getChineseBigrams(normalizedText)])];
}

export function tokenizeSearchText(text: string) {
  const segmenter = getChineseSegmenter();

  if (!segmenter) {
    return tokenizeWithoutSegmenter(text);
  }

  const segmentedTokens = Array.from(segmenter.segment(text))
    .filter((part) => part.isWordLike)
    .map((part) => part.segment.toLocaleLowerCase("zh-CN"));

  return [...new Set([...segmentedTokens, ...getChineseBigrams(text)])];
}

export function buildSearch(documents: SearchDocument[]) {
  const search = new MiniSearch<IndexedSearchDocument>({
    fields: ["title", "summary", "category", "text", "tags"],
    storeFields: [
      "slug",
      "kind",
      "url",
      "title",
      "summary",
      "date",
      "formattedDate",
      "category",
      "categorySlug",
      "tags",
    ],
    tokenize: tokenizeSearchText,
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
    },
  });

  search.addAll(
    documents.map((document) => ({
      ...document,
      tags: document.tags.join(" "),
    })),
  );

  return search;
}
