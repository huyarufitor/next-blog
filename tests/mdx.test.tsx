import { readFileSync } from "node:fs";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { renderMdx } from "@/lib/mdx";

describe("renderMdx code highlighting", () => {
  it("emits both light and dark Shiki token variables", async () => {
    const content = await renderMdx([
      "```ts",
      "const answer = 42;",
      "```",
    ].join("\n"));
    const markup = renderToStaticMarkup(<>{content}</>);

    expect(markup).toContain("--shiki-light");
    expect(markup).toContain("--shiki-dark");
    expect(markup).toContain("--shiki-light-bg");
    expect(markup).toContain("--shiki-dark-bg");
  });

  it("maps Shiki token colors and backgrounds for both themes", () => {
    const css = readFileSync("app/globals.css", "utf8");

    expect(css).toContain("var(--shiki-light)");
    expect(css).toContain("var(--shiki-light-bg)");
    expect(css).toContain("var(--shiki-dark)");
    expect(css).toContain("var(--shiki-dark-bg)");
  });
});
