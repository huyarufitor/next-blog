import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getGiscusConfig,
  getSiteUrl,
  type GiscusEnvironment,
} from "@/lib/site-config";

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined);
  vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", undefined);
  vi.stubEnv("VERCEL_URL", undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getSiteUrl", () => {
  it("prefers NEXT_PUBLIC_SITE_URL over both Vercel URLs", () => {
    expect(
      getSiteUrl({
        NEXT_PUBLIC_SITE_URL: " https://custom.example.com/// ",
        VERCEL_PROJECT_PRODUCTION_URL: "production.vercel.app",
        VERCEL_URL: "preview.vercel.app",
      }),
    ).toBe("https://custom.example.com");
  });

  it("uses the production Vercel URL before the preview URL", () => {
    expect(
      getSiteUrl({
        VERCEL_PROJECT_PRODUCTION_URL: "production.vercel.app///",
        VERCEL_URL: "preview.vercel.app",
      }),
    ).toBe("https://production.vercel.app");
  });

  it("uses the preview Vercel URL when no higher-priority URL exists", () => {
    expect(
      getSiteUrl({ VERCEL_URL: " preview.vercel.app/// " }),
    ).toBe("https://preview.vercel.app");
  });

  it("preserves an explicit HTTP protocol on a Vercel URL", () => {
    expect(
      getSiteUrl({ VERCEL_URL: "http://preview.vercel.app///" }),
    ).toBe("http://preview.vercel.app");
  });

  it("falls back to localhost in production when every URL is missing", () => {
    expect(getSiteUrl({ NODE_ENV: "production" })).toBe(
      "http://localhost:3000",
    );
  });

  it("ignores blank values while resolving the fallback chain", () => {
    expect(
      getSiteUrl({
        NEXT_PUBLIC_SITE_URL: "   ",
        VERCEL_PROJECT_PRODUCTION_URL: " ",
        VERCEL_URL: "preview.vercel.app",
      }),
    ).toBe("https://preview.vercel.app");
  });

  it("reads the URL chain from process.env by default", () => {
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "production.vercel.app///");

    expect(getSiteUrl()).toBe("https://production.vercel.app");
  });

  it("rejects a NEXT_PUBLIC_SITE_URL without an HTTP(S) protocol", () => {
    expect(() =>
      getSiteUrl({ NEXT_PUBLIC_SITE_URL: "blog.example.com" }),
    ).toThrowError(
      "NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) URL.",
    );
  });

  it.each([
    "VERCEL_PROJECT_PRODUCTION_URL",
    "VERCEL_URL",
  ] as const)("rejects an invalid protocol from %s", (field) => {
    expect(() => getSiteUrl({ [field]: "ftp://files.example.com" }))
      .toThrowError(`${field} must be an absolute HTTP(S) URL.`);
  });

  it("rejects an invalid absolute custom URL", () => {
    expect(() =>
      getSiteUrl({ NEXT_PUBLIC_SITE_URL: "not-a-url" }),
    ).toThrowError(
      "NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) URL.",
    );
  });
});

describe("getGiscusConfig", () => {
  const completeEnvironment: GiscusEnvironment = {
    NEXT_PUBLIC_GISCUS_REPO: "lin-mo/blog",
    NEXT_PUBLIC_GISCUS_REPO_ID: "R_kgDOExample",
    NEXT_PUBLIC_GISCUS_CATEGORY: "Announcements",
    NEXT_PUBLIC_GISCUS_CATEGORY_ID: "DIC_kwDOExample4C",
  };
  const requiredFields = [
    "NEXT_PUBLIC_GISCUS_REPO",
    "NEXT_PUBLIC_GISCUS_REPO_ID",
    "NEXT_PUBLIC_GISCUS_CATEGORY",
    "NEXT_PUBLIC_GISCUS_CATEGORY_ID",
  ] as const satisfies readonly (keyof GiscusEnvironment)[];

  it("returns a usable config when all four values are present", () => {
    expect(getGiscusConfig(completeEnvironment)).toEqual({
      repo: "lin-mo/blog",
      repoId: "R_kgDOExample",
      category: "Announcements",
      categoryId: "DIC_kwDOExample4C",
    });
  });

  it.each(requiredFields)("returns null when %s is missing", (field) => {
    const incompleteEnvironment = { ...completeEnvironment };
    delete incompleteEnvironment[field];

    expect(getGiscusConfig(incompleteEnvironment)).toBeNull();
  });

  it.each(requiredFields)("returns null when %s is blank", (field) => {
    const blankEnvironment = { ...completeEnvironment, [field]: "   " };

    expect(getGiscusConfig(blankEnvironment)).toBeNull();
  });
});
