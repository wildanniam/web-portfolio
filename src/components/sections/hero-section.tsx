import { HeroMedia } from "@/components/interactive/hero-media";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export function HeroSection() {
  return (
    <section
      data-hero-pin
      className="hero-scene relative flex min-h-[calc(100dvh-4.5rem)] items-center py-12 sm:py-16 lg:py-18"
    >
      <Container className="grid items-center gap-12 xl:grid-cols-[minmax(0,1.25fr)_minmax(25rem,0.75fr)] xl:gap-16">
        <div data-hero-copy className="max-w-[46rem]">
          <p className="mb-6 max-w-[42rem] font-mono text-[0.68rem] leading-relaxed font-semibold tracking-[0.14em] text-ember-700">
            {siteContent.hero.eyebrow}
          </p>
          <h1
            className="display-balance font-display text-[clamp(3rem,7vw,5rem)] leading-[0.95] font-[520] tracking-[-0.055em] text-ink-900 xl:text-[2.8rem]"
            aria-label={siteContent.hero.title}
          >
            <span className="xl:block xl:whitespace-nowrap">I research and build autonomous</span>{" "}
            <span className="xl:block xl:whitespace-nowrap">systems people can verify.</span>
          </h1>
          <p className="copy-pretty mt-7 max-w-[38rem] text-base leading-7 text-ink-600 sm:text-lg">
            {siteContent.hero.supportingCopy}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteContent.hero.primaryAction.href}>
              {siteContent.hero.primaryAction.label}
            </ButtonLink>
            <ButtonLink href={siteContent.hero.secondaryAction.href} variant="secondary">
              {siteContent.hero.secondaryAction.label}
            </ButtonLink>
          </div>
        </div>

        <div data-hero-media-frame className="hero-media-frame xl:-mr-16">
          <HeroMedia />
        </div>
      </Container>

      <div className="hero-handoff-signal" aria-hidden="true">
        <span data-hero-signal />
        <i data-hero-signal-head />
      </div>
    </section>
  );
}
