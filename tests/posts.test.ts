import { describe, expect, it } from "vitest";

import {
  formatPostDate,
  formatReadingTime,
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
