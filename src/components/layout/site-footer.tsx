import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-smoke-900 text-paper-0">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-paper-0/14" />
      <Container className="relative pt-12 pb-6 sm:pt-16 sm:pb-8">
        <div className="grid gap-10 border-b border-paper-0/14 pb-12 sm:grid-cols-[1.15fr_0.85fr] sm:items-end sm:pb-16 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[#F2A47E] uppercase">
              One good idea can become something real
            </p>
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="group mt-5 inline-flex max-w-4xl items-end gap-3 font-display text-[clamp(2.75rem,7vw,7rem)] leading-[0.88] font-medium tracking-[-0.055em] text-paper-0"
            >
              <span>Let&apos;s build it.</span>
              <span
                aria-hidden="true"
                className="mb-[0.08em] text-[0.42em] text-ember-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
          </div>

          <dl className="grid gap-5 text-sm sm:justify-self-end sm:text-right">
            <div>
              <dt className="font-mono text-[0.61rem] tracking-[0.14em] text-paper-0/65 uppercase">
                Based in
              </dt>
              <dd className="mt-1 text-paper-0/78">{siteContent.contact.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.61rem] tracking-[0.14em] text-paper-0/65 uppercase">
                Working across
              </dt>
              <dd className="mt-1 max-w-xs text-paper-0/78">
                AI agents, Web3, and product engineering
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative border-b border-paper-0/14 py-12 sm:py-16 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 flex items-center gap-2 -translate-y-1/2"
          >
            <span className="block size-2 rotate-45 bg-ember-500" />
            <span className="block h-px w-24 bg-gradient-to-r from-ember-500 to-transparent sm:w-48" />
          </div>
          <p className="font-display text-[19vw] leading-[0.72] font-semibold tracking-[-0.075em] text-paper-0 sm:whitespace-nowrap sm:text-[clamp(4.25rem,14.8vw,14rem)]">
            <span className="block sm:inline">WILDAN</span>{" "}
            <span className="block text-right sm:inline">NIAM</span>
          </p>
        </div>

        <div className="flex flex-col gap-6 pt-6 font-mono text-[0.64rem] font-semibold tracking-[0.1em] text-paper-0/52 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteContent.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="transition-colors hover:text-paper-0"
            >
              Email
            </a>
            <a
              href={siteContent.contact.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-paper-0"
            >
              GitHub
            </a>
            <a
              href={siteContent.contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-paper-0"
            >
              Instagram
            </a>
            <a href="#main-content" className="transition-colors hover:text-paper-0">
              Back to top ↑
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
