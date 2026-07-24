import { describe, expect, it } from "vitest";

import { getSearchDocuments } from "@/lib/posts";

async function loadSearchModule() {
  return import("@/lib/search").catch(() => null);
}

describe("tokenizeSearchText", () => {
  it("segments Chinese words in the middle of a sentence", async () => {
    const searchModule = await loadSearchModule();

    expect(searchModule).not.toBeNull();
    if (!searchModule) return;

    expect(
      searchModule.tokenizeSearchText("静态优先的博客，不必过度设计"),
    ).toEqual(expect.arrayContaining(["博客", "过度"]));
  });
});

describe("buildSearch", () => {
  it.each([
    ["博客", "getting-started-with-this-blog"],
    ["过度", "static-first-blogging"],
    ["外部搜索", "static-first-blogging"],
    ["技术实践", "getting-started-with-this-blog"],
  ])("finds a real post for the middle term %s", async (query, slug) => {
    const searchModule = await loadSearchModule();

    expect(searchModule).not.toBeNull();
    if (!searchModule) return;

    const documents = await getSearchDocuments();
    const results = searchModule.buildSearch(documents).search(query);

    expect(results.map((result) => result.id)).toContain(slug);
  });

  it("indexes public notes with their nested knowledge-base URL", async () => {
    const searchModule = await loadSearchModule();

    expect(searchModule).not.toBeNull();
    if (!searchModule) return;

    const documents = await getSearchDocuments();
    const results = searchModule.buildSearch(documents).search("迁移前审核");
    const note = results.find((result) => result.kind === "note");

    expect(note).toMatchObject({
      title: "知识库使用说明",
      url: "/notes/knowledge-base/getting-started",
      category: "知识库维护",
    });
    expect(documents.some((document) => document.url.includes("define-property"))).toBe(false);
  });
});
