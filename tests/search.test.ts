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
  ])("finds a real post for the middle term %s", async (query, slug) => {
    const searchModule = await loadSearchModule();

    expect(searchModule).not.toBeNull();
    if (!searchModule) return;

    const documents = await getSearchDocuments();
    const results = searchModule.buildSearch(documents).search(query);

    expect(results.map((result) => result.id)).toContain(slug);
  });
});
