import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "giscus-widget": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        repo: string;
        repoId: string;
        category: string;
        categoryId: string;
        mapping?: string;
        reactionsEnabled?: string;
        emitMetadata?: string;
        inputPosition?: string;
        lang?: string;
        loading?: string;
        theme?: string;
      };
    }
  }
}
