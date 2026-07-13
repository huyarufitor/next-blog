import { readFileSync } from "node:fs";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  ThemeToggle,
  ThemeTogglePlaceholder,
  ThemeToggleView,
} from "@/components/theme/theme-toggle";
import Home from "@/app/page";

const options = [
  { theme: "light", label: "切换到浅色模式" },
  { theme: "dark", label: "切换到深色模式" },
  { theme: "system", label: "跟随系统主题" },
] as const;

describe("ThemeToggleView", () => {
  it.each(options)("为 $theme 稳定渲染三个 36px 主题按钮", ({ theme }) => {
    const markup = renderToStaticMarkup(
      <ThemeToggleView theme={theme} onThemeChange={() => undefined} />,
    );
    const buttons = [...markup.matchAll(/<button\b[^>]*>/g)].map(
      ([button]) => button,
    );

    expect(buttons).toHaveLength(3);
    for (const button of buttons) {
      expect(button).toContain("size-9");
    }
  });

  it.each(options)("为 $theme 提供中文名称与正确选中态", ({ theme }) => {
    const markup = renderToStaticMarkup(
      <ThemeToggleView theme={theme} onThemeChange={() => undefined} />,
    );

    for (const option of options) {
      const pressed = option.theme === theme ? "true" : "false";

      expect(markup).toContain(`aria-label="${option.label}"`);
      expect(markup).toContain(`title="${option.label}"`);
      expect(markup).toMatch(
        new RegExp(
          `aria-label="${option.label}"[^>]*aria-pressed="${pressed}"`,
        ),
      );
    }
  });
});

describe("ThemeToggle hydration", () => {
  it("renders a fixed-size placeholder with the same control geometry", () => {
    const markup = renderToStaticMarkup(<ThemeTogglePlaceholder />);

    expect(markup).toContain('class="theme-toggle theme-toggle-placeholder"');
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
