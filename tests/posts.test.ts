import { describe, expect, it } from "vitest";

import {
  formatPostDate,
  formatReadingTime,
  getCategorySummaries,
  getPostsByCategory,
  getPostYear,
} from "@/lib/posts";

describe("formatPostDate", () => {
  it("formats an ISO date as a Chinese date", () => {
    expect(formatPostDate("2026-07-11")).toBe("2026年7月11日");
  });

  it("preserves a calendar date regardless of the process timezone", () => {
    expect(formatPostDate("2026-01-01")).toBe("2026年1月1日");
  });
});

describe("getPostYear", () => {
  it("extracts the calendar year without timezone conversion", () => {
    expect(getPostYear("2026-01-01")).toBe("2026");
  });
});

describe("formatReadingTime", () => {
  it("keeps whole minutes unchanged", () => {
    expect(formatReadingTime(3)).toBe("约 3 分钟阅读");
  });

  it("rounds fractional minutes up", () => {
    expect(formatReadingTime(3.01)).toBe("约 4 分钟阅读");
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "uses one minute as the minimum for %s",
    (minutes) => {
      expect(formatReadingTime(minutes)).toBe("约 1 分钟阅读");
    },
  );
});

describe("category queries", () => {
  it("returns all fixed categories with counts", async () => {
    const categories = await getCategorySummaries();

    expect(categories.map((category) => category.name)).toEqual([
      "技术实践",
      "工作手记",
      "音乐学习",
      "生活切片",
      "人生思考",
    ]);
    expect(categories.find((category) => category.slug === "technical-practice")?.count).toBe(2);
  });

  it("filters posts by category slug", async () => {
    const posts = await getPostsByCategory("technical-practice");

    expect(posts).toHaveLength(2);
    expect(posts.every((post) => post.category.slug === "technical-practice")).toBe(true);
  });
});
