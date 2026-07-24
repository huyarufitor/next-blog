import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/site-config";

const navigation = [
  { href: "/", label: "首页" },
  { href: "/notes", label: "知识库" },
  { href: "/archives", label: "归档" },
  { href: "/categories", label: "分类" },
  { href: "/tags", label: "标签" },
  { href: "/search", label: "搜索" },
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  return (
    <header className="surface-panel sticky top-4 z-20 rounded-lg px-4 py-3 sm:px-5">
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="min-w-0">
          <Link
            className="block truncate text-lg font-semibold text-strong"
            href="/"
          >
            {siteConfig.name}
          </Link>
          <p className="truncate text-sm text-muted">
            {siteConfig.author.role}
          </p>
        </div>

        <nav
          aria-label="主导航"
          className="col-span-2 row-start-2 flex min-w-0 flex-wrap items-center gap-1 text-sm text-muted sm:gap-2 lg:col-span-1 lg:col-start-2 lg:row-start-1"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              className="rounded-md px-2 py-2 transition-colors hover:bg-inverse hover:text-inverse-text sm:px-3"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="col-start-2 row-start-1 shrink-0 lg:col-start-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
