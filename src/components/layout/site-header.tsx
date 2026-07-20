"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

const navigation = [
  { label: "Work", href: "/#selected-work", sectionId: "selected-work", route: "/work" },
  { label: "About", href: "/#about", sectionId: "about", route: "/about" },
  { label: "Contact", href: "/#contact", sectionId: "contact", route: null },
] as const;

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const hadOpenMenuRef = useRef(false);
  const isHome = pathname === "/";
  const isHeroState = isHome && !isScrolled && !isMenuOpen;

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 48);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sections = navigation
      .map((item) => document.getElementById(item.sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isMenuOpen) {
      if (hadOpenMenuRef.current) menuButtonRef.current?.focus();
      return;
    }

    hadOpenMenuRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = menuPanelRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(focusableSelector);
    window.requestAnimationFrame(() => firstFocusable?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const isItemActive = (sectionId: string, route: string | null) =>
    (isHome && activeSection === sectionId) || (route !== null && pathname.startsWith(route));

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,color] duration-300 ${
          isHeroState
            ? "border-transparent bg-gradient-to-b from-smoke-900/60 to-transparent text-paper-0"
            : "border-line-200/70 bg-paper-0/84 text-ink-900 shadow-[0_14px_40px_rgb(26_23_20/0.07)] backdrop-blur-xl"
        }`}
      >
        <Container className="flex min-h-20 items-center justify-between gap-5">
          <Link
            href="/"
            className="group inline-flex min-h-11 items-center gap-2.5"
            aria-label="Wildan Syukri Niam home"
            onClick={closeMenu}
          >
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rotate-45 border transition-colors duration-300 ${
                isHeroState
                  ? "border-ember-500 bg-ember-500"
                  : "border-ember-700 bg-ember-500"
              }`}
            />
            <span className="font-display text-[1.38rem] font-semibold tracking-[-0.045em]">
              Wildan<span className="text-ember-500">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <nav aria-label="Primary navigation" className="flex items-center gap-7">
              {navigation.map((item) => {
                const active = isItemActive(item.sectionId, item.route);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-11 items-center text-[0.82rem] font-semibold tracking-[-0.01em] transition-colors after:absolute after:right-0 after:bottom-1.5 after:left-0 after:h-px after:origin-left after:bg-ember-500 after:transition-transform after:duration-200 ${
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                    } ${isHeroState ? "text-paper-0/82 hover:text-paper-0" : "text-ink-600 hover:text-ink-900"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <a
              href={`mailto:${siteContent.contact.email}`}
              className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-[0.78rem] font-bold tracking-[-0.01em] transition-colors ${
                isHeroState
                  ? "border-paper-0/45 bg-paper-0/10 text-paper-0 hover:border-paper-0 hover:bg-paper-0 hover:text-ink-900"
                  : "border-ink-900 bg-ink-900 text-paper-0 hover:border-ember-700 hover:bg-ember-700"
              }`}
            >
              Let&apos;s talk
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className={`relative grid size-11 place-items-center rounded-full border transition-colors focus-visible:rounded-full md:hidden ${
              isHeroState
                ? "border-paper-0/40 bg-smoke-900/15 text-paper-0"
                : "border-line-200 bg-paper-0 text-ink-900"
            }`}
            aria-expanded={isMenuOpen}
            aria-controls="site-mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3.5 w-4.5">
              <span
                className={`absolute top-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-[6px] left-0 h-px w-full bg-current transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </Container>
      </header>

      {!isHome ? <div aria-hidden="true" className="h-20" /> : null}

      {isMenuOpen ? (
        <div
          id="site-mobile-navigation"
          ref={menuPanelRef}
          className="fixed inset-0 z-40 grid bg-smoke-900 px-5 pt-28 pb-7 text-paper-0 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex w-full max-w-xl flex-col">
            <p className="font-mono text-[0.63rem] font-bold tracking-[0.16em] text-ember-500 uppercase">
              Explore the portfolio
            </p>
            <nav aria-label="Mobile navigation" className="mt-7 grid border-t border-paper-0/15">
              {navigation.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex min-h-20 items-center justify-between border-b border-paper-0/15 font-display text-[clamp(2.35rem,12vw,4rem)] leading-none tracking-[-0.045em]"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-paper-0/38 transition-colors group-hover:text-ember-500">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto grid gap-5 border-t border-paper-0/15 pt-6">
              <a
                href={`mailto:${siteContent.contact.email}`}
                onClick={closeMenu}
                className="inline-flex min-h-12 items-center justify-between rounded-full bg-ember-500 px-5 font-bold text-smoke-900"
              >
                <span>Let&apos;s talk</span>
                <span aria-hidden="true">↗</span>
              </a>
              <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.12em] text-paper-0/48 uppercase">
                <span>{siteContent.contact.location}</span>
                <span>Full-Stack Builder</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
