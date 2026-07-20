import { HeroMediaStatic } from "@/components/interactive/hero-media-static";
import { LazyHeroMedia } from "@/components/interactive/lazy-hero-media";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export function HeroSection() {
  return (
    <section
      id="top"
      data-hero-scene
      className="hero-scene hero-cinematic relative isolate flex min-h-[100svh] overflow-hidden bg-smoke-900"
    >
      <div className="hero-media-frame absolute inset-0">
        <LazyHeroMedia fallback={<HeroMediaStatic />} />
      </div>

      <div className="hero-cinematic__scrim" aria-hidden="true" />
      <div className="hero-cinematic__frame" aria-hidden="true" />

      <Container className="hero-cinematic__inner pointer-events-none relative z-10 flex min-h-[100svh] items-center pt-28 pb-24 sm:pt-32 lg:pt-36 lg:pb-28">
        <div className="hero-cinematic__copy pointer-events-auto max-w-[49rem]">
          <p className="mb-5 max-w-[42rem] font-mono text-[0.66rem] leading-relaxed font-semibold tracking-[0.14em] text-[#F2A47E] sm:mb-6">
            {siteContent.hero.eyebrow}
          </p>
          <h1
            className="hero-cinematic__title display-balance text-paper-0"
            aria-label={siteContent.hero.title}
          >
            <span className="hero-cinematic__title-line">I turn complex ideas</span>
            <span className="hero-cinematic__title-line">
              into <span className="hero-cinematic__accent">working products.</span>
            </span>
          </h1>
          <p className="copy-pretty mt-6 max-w-[34rem] text-base leading-7 text-paper-0/78 sm:mt-7 sm:text-lg">
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

      <div className="hero-cinematic__index" aria-hidden="true">
        <span>00</span>
        <i />
        <span>INTRO</span>
      </div>
    </section>
  );
}
