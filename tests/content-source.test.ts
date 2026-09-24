import { describe, expect, it } from "vitest";

import { normalizePublicContentPath } from "@/lib/content-source";

describe("public content source", () => {
  it("normalizes public content paths for module imports", () => {
    expect(normalizePublicContentPath("posts\\article.mdx")).toBe(
      "posts/article.mdx",
    );
  });

  it("rejects paths outside public content", () => {
    expect(() => normalizePublicContentPath("notes-local/private.md")).toThrow(
      "Invalid public content path",
    );
  });
});
