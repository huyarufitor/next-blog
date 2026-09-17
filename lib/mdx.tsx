import type { ReactNode } from "react";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const mdxComponents = {
  img: (props: React.ComponentProps<"img">) => {
    const isAppScreenshot = props.className?.split(/\s+/).includes("app-screenshot");

    return (
      // MDX images may use arbitrary local or external paths; preserve the existing renderer.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        alt={props.alt ?? ""}
        style={
          isAppScreenshot
            ? {
                ...props.style,
                display: "block",
                width: "100%",
                maxWidth: "375px",
                marginInline: "auto",
              }
            : props.style
        }
      />
    );
  },
  a: (props: React.ComponentProps<"a">) => {
    const href = props.href ?? "";
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      );
    }

    return <a rel="noreferrer" target="_blank" {...props} />;
  },
};

export async function renderMdx(source: string): Promise<ReactNode> {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["anchor-link"],
                ariaLabel: "Anchor",
              },
              content: {
                type: "text",
                value: "#",
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: {
                light: "github-light",
                dark: "github-dark",
              },
            },
          ],
        ],
      },
    },
  });

  return content;
}
