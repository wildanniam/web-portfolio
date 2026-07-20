import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-200 py-8">
      <Container className="flex flex-col gap-5 text-sm text-ink-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteContent.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/work" className="hover:text-ink-900">
            Work
          </Link>
          <Link href="/about" className="hover:text-ink-900">
            About
          </Link>
          <a href={`mailto:${siteContent.contact.email}`} className="hover:text-ink-900">
            Email
          </a>
          <a
            href={siteContent.contact.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink-900"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}
