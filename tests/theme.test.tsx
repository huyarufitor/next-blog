import { readFileSync } from "node:fs";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  getThemeToggleState,
  ThemeToggle,
  ThemeTogglePlaceholder,
  ThemeToggleView,
} from "@/components/theme/theme-toggle";
import Home from "@/app/page";

const modes = [
  {
    resolvedTheme: "light",
    nextTheme: "dark",
    label: "切换到深色模式",
  },
  {
    resolvedTheme: "dark",
    nextTheme: "light",
    label: "切换到浅色模式",
  },
] as const;

describe("ThemeToggleView", () => {
  it.each(modes)(
    "在 $resolvedTheme 模式下渲染一个 40px 切换按钮",
    ({ resolvedTheme, label }) => {
      const markup = renderToStaticMarkup(
        <ThemeToggleView
          state={getThemeToggleState(resolvedTheme)}
          onToggle={() => undefined}
        />,
      );
      const buttons = [...markup.matchAll(/<button\b[^>]*>/g)].map(
        ([button]) => button,
      );

      expect(buttons).toHaveLength(1);
      expect(buttons[0]).toContain("size-10");
      expect(buttons[0]).toContain(`aria-label="${label}"`);
      expect(buttons[0]).toContain(`title="${label}"`);
    },
  );

  it.each(modes)(
    "从 $resolvedTheme 切换到 $nextTheme",
    ({ resolvedTheme, nextTheme, label }) => {
      expect(getThemeToggleState(resolvedTheme)).toMatchObject({
        currentTheme: resolvedTheme,
        nextTheme,
        label,
      });
    },
  );

  it("在主题尚未解析时按浅色模式处理", () => {
    expect(getThemeToggleState(undefined)).toMatchObject({
      currentTheme: "light",
      nextTheme: "dark",
    });
  });
});

describe("ThemeToggle hydration", () => {
  it("renders a fixed-size placeholder with the same control geometry", () => {
    const markup = renderToStaticMarkup(<ThemeTogglePlaceholder />);

    expect(markup).toContain(
      'class="theme-toggle-button theme-toggle-placeholder size-10"',
    );
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).not.toContain("<button");
  });

  it("uses the placeholder during server rendering", () => {
    const markup = renderToStaticMarkup(<ThemeToggle />);

    expect(markup).toContain("theme-toggle-placeholder");
    expect(markup).not.toContain("<button");
  });
});

describe("theme accessibility styles", () => {
  it("uses a dedicated inverse eyebrow in the author panel", async () => {
    const markup = renderToStaticMarkup(await Home());

    expect(markup).toContain('class="eyebrow-inverse"');
    expect(markup).not.toContain('class="eyebrow text-lime"');
  });

  it("preserves zero letter spacing and disables motion when requested", () => {
    const css = readFileSync("app/globals.css", "utf8");

    expect(css).toMatch(/letter-spacing:\s*0\s*!important/);
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toMatch(/scroll-behavior:\s*auto\s*!important/);
    expect(css).toMatch(/animation:\s*none\s*!important/);
    expect(css).toMatch(/transition-duration:\s*0\.01ms\s*!important/);
    expect(css).toMatch(/:hover[\s\S]*transform:\s*none\s*!important/);
  });
});
