import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";
import { getSiteUrl, serializeJsonLd } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Wildan uses applied research, full-stack product work, and verifiable evidence to build autonomous systems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const siteUrl = getSiteUrl();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": new URL("/#person", siteUrl).toString(),
    name: siteContent.name,
    jobTitle: siteContent.role,
    description: siteContent.positioning,
    email: `mailto:${siteContent.contact.email}`,
    homeLocation: {
      "@type": "Place",
      name: siteContent.contact.location,
    },
    sameAs: [siteContent.contact.github],
    url: new URL("/about", siteUrl).toString(),
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(personJsonLd),
        }}
      />
      <section className="py-20 sm:py-28">
        <Container>
          <p className="font-mono text-xs font-semibold tracking-[0.1em] text-ember-700">
            ABOUT
          </p>
          <h1 className="display-balance mt-5 max-w-[12ch] font-display text-6xl leading-[0.96] font-[520] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Building is how I investigate a system.
          </h1>
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <p className="text-xl leading-9 text-ink-700">{siteContent.about.short}</p>
            <div className="max-w-[48rem]">
              <p className="text-xl leading-9 text-ink-700">{siteContent.about.extended}</p>
              <p className="mt-7 text-lg leading-8 text-ink-600">
                Across AI and Web3, the recurring question is consistent: how can software become
                more autonomous without becoming opaque?
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line-200 bg-paper-1/55 py-20 sm:py-24">
        <Container>
          <h2 className="font-display text-5xl font-[520] tracking-[-0.05em]">
            Working principles
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {siteContent.principles.map((principle) => (
              <article key={principle.title} className="border-t border-line-200 pt-6">
                <h3 className="text-xl font-semibold tracking-[-0.025em]">{principle.title}</h3>
                <p className="mt-3 max-w-[34rem] leading-7 text-ink-600">{principle.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-5xl font-[520] tracking-[-0.05em]">
              Inspect the work
            </h2>
            <p className="mt-5 max-w-[42rem] text-lg leading-8 text-ink-600">
              The portfolio records what each system does, what I contributed, and what the current
              evidence does not prove.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/work">Explore My Work</ButtonLink>
            <ButtonLink href={siteContent.contact.github} variant="secondary">
              View GitHub
            </ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
