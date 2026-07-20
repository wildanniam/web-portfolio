import { HeroMediaStatic } from "@/components/interactive/hero-media-static";
import { LazyHeroMedia } from "@/components/interactive/lazy-hero-media";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export function HeroSection() {
  return (
    <section
      data-hero-pin
      className="hero-scene hero-cinematic relative isolate flex min-h-[calc(100dvh-4.5rem)] overflow-hidden bg-smoke-900"
    >
      <div data-hero-media-frame className="hero-media-frame absolute inset-0">
        <LazyHeroMedia fallback={<HeroMediaStatic />} />
      </div>

      <div className="hero-cinematic__scrim" aria-hidden="true" />

      <Container className="pointer-events-none relative z-10 flex min-h-[calc(100dvh-4.5rem)] items-end py-10 sm:py-14 lg:py-16">
        <div data-hero-copy className="pointer-events-auto max-w-[52rem] pb-14 sm:pb-10 lg:pb-2">
          <p className="mb-5 max-w-[42rem] font-mono text-[0.66rem] leading-relaxed font-semibold tracking-[0.14em] text-[#F2A47E] sm:mb-6">
            {siteContent.hero.eyebrow}
          </p>
          <h1
            className="display-balance max-w-[67rem] font-display text-[clamp(3.2rem,7.6vw,6.9rem)] leading-[0.9] font-[520] tracking-[-0.06em] text-paper-0 xl:text-[4.65rem]"
            aria-label={siteContent.hero.title}
          >
            <span className="xl:block xl:whitespace-nowrap">I turn complex ideas into</span>{" "}
            <span className="xl:block xl:whitespace-nowrap">working products.</span>
          </h1>
          <p className="copy-pretty mt-6 max-w-[39rem] text-base leading-7 text-paper-0/78 sm:mt-7 sm:text-lg">
            {siteContent.hero.supportingCopy}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={siteContent.hero.primaryAction.href}
              variant="hero-primary"
            >
              {siteContent.hero.primaryAction.label}
            </ButtonLink>
            <ButtonLink
              href={siteContent.hero.secondaryAction.href}
              variant="hero-secondary"
              className="backdrop-blur-md"
            >
              {siteContent.hero.secondaryAction.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="hero-handoff-signal" aria-hidden="true">
        <span data-hero-signal />
        <i data-hero-signal-head />
      </div>
    </section>
  );
}
