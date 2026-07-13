import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "giscus-widget": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        repo: string;
        "repo-id": string;
        category: string;
        "category-id": string;
        mapping?: string;
        "reactions-enabled"?: string;
        "emit-metadata"?: string;
        "input-position"?: string;
        lang?: string;
        loading?: string;
        theme?: string;
      };
    }
  }
}
