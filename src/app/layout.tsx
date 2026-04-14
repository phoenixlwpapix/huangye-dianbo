import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "荒野电波",
    template: "%s · 荒野电波",
  },
  description: "阿荒的博客 —— 记录想法、作品与过程。",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="荒野电波"
                width={28}
                height={28}
                className="dark:invert"
                priority
              />
              <span className="flex items-baseline gap-2">
                <span className="text-base font-semibold tracking-tight">
                  荒野电波
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-[var(--muted)]">
                  WILD WAVES
                </span>
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
              <Link href="/" className="hover:text-[var(--fg)] transition-colors">
                文章
              </Link>
              <a
                href="https://www.studioyyh.tech"
                className="hover:text-[var(--fg)] transition-colors"
              >
                主页 ↗
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--border)] mt-24">
          <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between text-xs text-[var(--muted)]">
            <span>© {new Date().getFullYear()} 阿荒</span>
            <span>Made with Next.js</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
