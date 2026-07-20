import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const { giscusImportSpy } = vi.hoisted(() => ({
  giscusImportSpy: vi.fn(),
}));

vi.mock("giscus", () => {
  giscusImportSpy();
  return {};
});

import {
  getGiscusTheme,
  GiscusCommentsView,
} from "@/components/comments/giscus-comments";
import type { GiscusConfig } from "@/lib/site-config";

const config: GiscusConfig = {
  repo: "lin-mo/blog",
  repoId: "R_kgDOExample",
  category: "Announcements",
  categoryId: "DIC_kwDOExample4C",
};

describe("Giscus module loading", () => {
  it("does not import giscus as a module side effect", () => {
    expect(giscusImportSpy).not.toHaveBeenCalled();
  });

  it("does not invoke the loader when configuration is missing", async () => {
    const commentsModule = await import(
      "@/components/comments/giscus-comments"
    );
    const loadGiscusWhenConfigured =
      commentsModule.loadGiscusWhenConfigured;
    const loader = vi.fn(async () => ({}));

    expect(loadGiscusWhenConfigured).toBeTypeOf("function");
    await loadGiscusWhenConfigured(null, loader);

    expect(loader).not.toHaveBeenCalled();
  });

  it("invokes the loader once when configuration is complete", async () => {
    const commentsModule = await import(
      "@/components/comments/giscus-comments"
    );
    const loadGiscusWhenConfigured =
      commentsModule.loadGiscusWhenConfigured;
    const loader = vi.fn(async () => ({}));

    expect(loadGiscusWhenConfigured).toBeTypeOf("function");
    await loadGiscusWhenConfigured(config, loader);

    expect(loader).toHaveBeenCalledOnce();
  });
});

describe("getGiscusTheme", () => {
  it("maps a resolved dark theme to Giscus dark", () => {
    expect(getGiscusTheme("dark")).toBe("dark");
  });

  it.each(["light", "system", undefined])(
    "maps %s to Giscus light",
    (theme) => {
      expect(getGiscusTheme(theme)).toBe("light");
    },
  );
});

describe("GiscusCommentsView", () => {
  it("keeps the Chinese fallback when configuration is missing", () => {
    const markup = renderToStaticMarkup(
      createElement(GiscusCommentsView, {
        config: null,
        hydrated: false,
        resolvedTheme: undefined,
      }),
    );

    expect(markup).toContain("配置");
    expect(markup).toContain("NEXT_PUBLIC_GISCUS_*");
  });

  it("renders a stable placeholder before hydration", () => {
    const markup = renderToStaticMarkup(
      createElement(GiscusCommentsView, {
        config,
        hydrated: false,
        resolvedTheme: undefined,
      }),
    );

    expect(markup).toContain("giscus-placeholder");
    expect(markup).toContain("min-h-64");
    expect(markup).not.toContain("giscus-widget");
  });

  it("renders a Chinese dark Giscus widget after hydration", () => {
    const markup = renderToStaticMarkup(
      createElement(GiscusCommentsView, {
        config,
        hydrated: true,
        resolvedTheme: "dark",
      }),
    );

    expect(markup).toContain("giscus-widget");
    expect(markup).toContain('lang="zh-CN"');
    expect(markup).toContain('theme="dark"');
    expect(markup).toContain('repoId="R_kgDOExample"');
    expect(markup).toContain('categoryId="DIC_kwDOExample4C"');
    expect(markup).toContain('inputPosition="top"');
  });
});
