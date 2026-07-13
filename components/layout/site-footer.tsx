import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {siteConfig.name} / 使用 Next.js、MDX、RSS、Sitemap 与静态搜索构建。
        </p>
        <div className="flex items-center gap-4">
          <Link href="/rss.xml">RSS</Link>
          <Link href="/sitemap.xml">站点地图</Link>
          <Link href="/about">关于</Link>
        </div>
      </div>
    </footer>
  );
}
