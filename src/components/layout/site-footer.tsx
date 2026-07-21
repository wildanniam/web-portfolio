import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-smoke-900 text-paper-0">
      <Container className="relative pt-12 pb-7 sm:pt-16 sm:pb-9">
        <dl className="grid gap-7 sm:grid-cols-3 sm:gap-10">
          <div>
            <dt className="font-mono text-[0.61rem] tracking-[0.14em] text-[#F2A47E] uppercase">
              Focus
            </dt>
            <dd className="mt-2 max-w-xs text-sm leading-relaxed text-paper-0/74">
              AI agents, Web3, and product engineering
            </dd>
          </div>
          <div className="sm:text-center">
            <dt className="font-mono text-[0.61rem] tracking-[0.14em] text-paper-0/54 uppercase">
              Available for
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-paper-0/74">
              Thoughtful collaborations
            </dd>
          </div>
          <div className="sm:text-right">
            <dt className="font-mono text-[0.61rem] tracking-[0.14em] text-paper-0/54 uppercase">
              Based in
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-paper-0/74">
              {siteContent.contact.location}
            </dd>
          </div>
        </dl>

        <div className="relative flex min-h-[19rem] items-center justify-center py-14 sm:min-h-[28rem] sm:py-20 lg:min-h-[32rem]">
          <p className="whitespace-nowrap font-sans text-[clamp(4.25rem,17vw,9rem)] leading-[0.78] font-semibold tracking-[-0.09em] text-paper-0 sm:text-[clamp(7rem,13.4vw,12.5rem)]">
            <span>wildan niam</span>
            <span className="text-[#F2A47E]">.</span>
          </p>
        </div>

        <div className="flex flex-col gap-5 font-mono text-[0.64rem] font-semibold tracking-[0.1em] text-paper-0/52 uppercase sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-2">
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="w-fit text-paper-0 underline decoration-paper-0/45 underline-offset-4 transition-colors hover:text-[#F2A47E]"
            >
              {siteContent.contact.email}
            </a>
            <p>
              © {new Date().getFullYear()} {siteContent.name}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
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
