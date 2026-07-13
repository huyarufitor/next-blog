import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/site-config";

const navigation = [
  { href: "/", label: "首页" },
  { href: "/archives", label: "归档" },
  { href: "/tags", label: "标签" },
  { href: "/search", label: "搜索" },
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  return (
    <header className="surface-panel sticky top-4 z-20 rounded-lg px-4 py-3 sm:px-5">
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center justify-between gap-3">
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
          <div className="shrink-0 lg:hidden">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-between gap-3">
          <nav
            aria-label="主导航"
            className="flex min-w-0 flex-wrap items-center gap-1 text-sm text-muted sm:gap-2"
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
          <div className="hidden shrink-0 lg:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
