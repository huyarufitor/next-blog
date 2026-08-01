import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PostToc } from "@/components/post/post-toc";

describe("PostToc", () => {
  it("renders nothing when the table of contents is empty", () => {
    expect(renderToStaticMarkup(<PostToc toc={[]} />)).toBe("");
  });

  it("groups level-three entries in collapsible level-two sections", () => {
    const markup = renderToStaticMarkup(
      <PostToc
        toc={[
          { id: "javascript", text: "JavaScript", level: 2 },
          { id: "closures", text: "闭包", level: 3 },
          { id: "promises", text: "Promise", level: 3 },
          { id: "summary", text: "总结", level: 2 },
        ]}
      />,
    );

    expect(markup).toMatch(/<details[^>]* open="">/);
    expect(markup.match(/<details/g)).toHaveLength(2);
    expect(markup.match(/<summary/g)).toHaveLength(2);
    expect(markup).toContain('href="#javascript"');
    expect(markup).toContain('href="#closures"');
    expect(markup).toContain('href="#promises"');
    expect(markup).toContain('href="#summary"');
  });

  it("limits the expanded navigation to the available viewport height", () => {
    const markup = renderToStaticMarkup(
      <PostToc toc={[{ id: "intro", text: "介绍", level: 2 }]} />,
    );

    expect(markup).toContain("max-h-[calc(100vh-10rem)]");
    expect(markup).toContain("overflow-y-auto");
    expect(markup).toContain("overscroll-contain");
  });
});
