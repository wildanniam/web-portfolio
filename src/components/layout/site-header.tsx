import Link from "next/link";

import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Work", href: "/work" },
  { label: "How I Work", href: "/#how-i-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="relative z-40 border-b border-line-200/80 bg-paper-0/88 backdrop-blur-xl">
      <Container className="flex min-h-18 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Wildan Syukri Niam home">
          <span className="grid size-9 place-items-center rounded-full border border-ink-900 bg-ink-900 font-mono text-[0.68rem] font-semibold tracking-tight text-paper-0 transition-colors group-hover:bg-ember-700">
            WN
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em]">Wildan Niam</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-600 transition-colors hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border border-line-200 px-4 text-sm font-semibold marker:hidden">
            Menu
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="paper-surface absolute top-14 right-0 grid min-w-52 gap-1 rounded-2xl border border-line-200 bg-paper-0 p-2"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-ink-700 hover:bg-paper-1 hover:text-ink-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
