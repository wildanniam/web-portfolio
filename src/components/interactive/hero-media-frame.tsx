import Image from "next/image";
import type { ReactNode } from "react";

type HeroMediaFrameProps = {
  isReady?: boolean;
  children?: ReactNode;
  control: ReactNode;
};

export function HeroMediaFrame({ isReady = false, children, control }: HeroMediaFrameProps) {
  return (
    <figure className="hero-media-surface relative size-full overflow-hidden bg-smoke-900">
      <picture
        className={`absolute inset-0 block transition-opacity duration-500 ${isReady ? "opacity-0" : "opacity-100"}`}
      >
        <source
          media="(max-width: 767px)"
          srcSet="/media/hero/wildan-hero-poster-mobile.jpg"
        />
        <Image
          src="/media/hero/wildan-hero-poster.jpg"
          alt="Wildan Syukri Niam welcoming visitors from a warm orange studio desk."
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </picture>

      {children}

      <div className="hero-media-control absolute top-[6.5rem] right-4 z-20 sm:top-[7.25rem] sm:right-8 lg:top-[7.75rem] lg:right-12">
        {control}
      </div>

      <figcaption
        data-testid="hero-media-disclosure"
        className="absolute right-4 bottom-4 z-20 max-w-[13rem] text-right text-[0.54rem] leading-[1.35] text-white/70 sm:right-8 sm:bottom-6 sm:max-w-[16rem] sm:text-[0.6rem] lg:right-12 lg:max-w-[19rem] lg:text-[0.68rem] lg:leading-relaxed"
      >
        Veo provenance mark remains visible.
      </figcaption>
    </figure>
  );
}
