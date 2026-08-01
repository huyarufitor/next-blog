import path from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { InterviewSidebar } from "@/components/interview/interview-sidebar";
import {
  getAllInterviewDocuments,
  getInterviewDocument,
  isInterviewReaderEnabled,
} from "@/lib/interviews";

const directory = path.join(
  process.cwd(),
  "tests",
  "fixtures",
  "interviews",
);

describe("local interview documents", () => {
  it("recursively discovers documents and maps README to the index slug", async () => {
    const documents = await getAllInterviewDocuments({
      directory,
      enabled: true,
    });

    expect(documents.map((document) => document.slug)).toEqual([
      "index",
      "candidates/example",
    ]);
    expect(documents[0]).toMatchObject({
      title: "面试资料入口",
      group: "资料",
    });
    expect(documents[1]).toMatchObject({
      title: "示例候选人 - 线下面试单",
      group: "候选人",
    });
  });

  it("returns content and a table of contents for a nested document", async () => {
    const document = await getInterviewDocument(["candidates", "example"], {
      directory,
      enabled: true,
    });

    expect(document?.content).not.toContain("# 示例候选人");
    expect(document?.content).toContain("候选人画像");
    expect(document?.toc).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text: "60 分钟流程", level: 2 }),
        expect.objectContaining({ text: "0-5 分钟：职责校准", level: 3 }),
      ]),
    );
  });

  it("does not read local documents when the reader is disabled", async () => {
    await expect(
      getAllInterviewDocuments({ directory, enabled: false }),
    ).resolves.toEqual([]);
    await expect(
      getInterviewDocument(["index"], { directory, enabled: false }),
    ).resolves.toBeNull();
  });

  it("rejects path traversal segments", async () => {
    await expect(
      getInterviewDocument(["..", "secret"], { directory, enabled: true }),
    ).resolves.toBeNull();
  });

  it("enables the reader outside production only", () => {
    expect(isInterviewReaderEnabled("development")).toBe(true);
    expect(isInterviewReaderEnabled("test")).toBe(true);
    expect(isInterviewReaderEnabled("production")).toBe(false);
  });
});

describe("interview reader navigation", () => {
  it("renders grouped links for the index and nested candidate documents", () => {
    const markup = renderToStaticMarkup(
      <InterviewSidebar
        documents={[
          {
            slug: "index",
            title: "面试资料入口",
            summary: "入口",
            group: "资料",
          },
          {
            slug: "candidates/example",
            title: "示例候选人",
            summary: "候选人",
            group: "候选人",
          },
        ]}
      />,
    );

    expect(markup).toContain('href="/interviews"');
    expect(markup).toContain('href="/interviews/candidates/example"');
    expect(markup).toContain("仅本地");
    expect(markup).toContain("候选人");
    expect(markup).toContain("选择资料");
  });
});
