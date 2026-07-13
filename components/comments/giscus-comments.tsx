"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

import { useHydrated } from "@/components/theme/use-hydrated";
import {
  getGiscusConfig,
  type GiscusConfig,
} from "@/lib/site-config";

const giscusConfig = getGiscusConfig();

type GiscusLoader = () => Promise<unknown>;

export function loadGiscusWhenConfigured(
  config: GiscusConfig | null,
  loader: GiscusLoader = () => import("giscus"),
) {
  if (!config) {
    return;
  }

  return loader();
}

type GiscusCommentsViewProps = {
  config: GiscusConfig | null;
  hydrated: boolean;
  resolvedTheme?: string;
};

export function getGiscusTheme(resolvedTheme?: string) {
  return resolvedTheme === "dark" ? "dark" : "light";
}

export function GiscusCommentsView({
  config,
  hydrated,
  resolvedTheme,
}: GiscusCommentsViewProps) {
  if (!config) {
    return (
      <div className="rounded-lg border border-dashed border-border p-5 text-sm leading-7 text-muted">
        请配置 <code>NEXT_PUBLIC_GISCUS_*</code> 环境变量以启用评论。
      </div>
    );
  }

  if (!hydrated) {
    return <div aria-hidden="true" className="giscus-placeholder min-h-64" />;
  }

  return (
    <giscus-widget
      repo={config.repo}
      repo-id={config.repoId}
      category={config.category}
      category-id={config.categoryId}
      mapping="pathname"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      lang="zh-CN"
      loading="lazy"
      theme={getGiscusTheme(resolvedTheme)}
    />
  );
}

export function GiscusComments() {
  const hydrated = useHydrated();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    void loadGiscusWhenConfigured(giscusConfig);
  }, []);

  return (
    <GiscusCommentsView
      config={giscusConfig}
      hydrated={hydrated}
      resolvedTheme={resolvedTheme}
    />
  );
}
