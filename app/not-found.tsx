import Link from "next/link";

export default function NotFound() {
  return (
    <div className="surface-panel mx-auto flex max-w-2xl flex-col items-center justify-center rounded-lg px-8 py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-strong">
        你访问的页面不存在。
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        它可能已被删除、更名，或者尚未发布。
      </p>
      <Link className="button-primary mt-8" href="/">
        返回首页
      </Link>
    </div>
  );
}
