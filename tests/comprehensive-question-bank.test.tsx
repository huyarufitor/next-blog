import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { renderMdx } from "@/lib/mdx";

const articlePath = path.join(
  process.cwd(),
  "content",
  "posts",
  "complete-frontend-interview-question-bank-2026.mdx",
);

describe("comprehensive frontend question bank", () => {
  it("contains 240 complete, sequential questions", async () => {
    const source = await fs.readFile(articlePath, "utf8");
    const { content } = matter(source);
    const questionNumbers = Array.from(
      content.matchAll(/^### (\d+)\./gm),
      (match) => Number(match[1]),
    );

    expect(questionNumbers).toEqual(
      Array.from({ length: 240 }, (_, index) => index + 1),
    );
    expect(content.match(/^\*\*参考答案\*\*：/gm)).toHaveLength(240);
    expect(content.match(/^\*\*考察重点\*\*：/gm)).toHaveLength(240);
    expect(content.match(/^\*\*继续追问\*\*：/gm)).toHaveLength(240);
  });

  it("compiles the complete draft through the production MDX renderer", async () => {
    const source = await fs.readFile(articlePath, "utf8");
    const { content } = matter(source);
    const markup = renderToStaticMarkup(await renderMdx(content));

    expect(markup).toContain("HTML 语义化有什么价值");
    expect(markup).toContain("AI 工作流画布");
    expect(markup).toContain("按岗位快速组卷");
  });
});
