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

      <div className="hero-media-meta absolute right-4 bottom-4 z-20 flex max-w-[30rem] items-center justify-end gap-3 sm:right-8 sm:bottom-6 lg:right-12">
        <figcaption
          data-testid="hero-media-disclosure"
          className="max-w-[10.5rem] text-right text-[0.54rem] leading-[1.35] text-white/70 sm:max-w-[14rem] sm:text-[0.6rem] lg:max-w-[23rem] lg:text-[0.68rem] lg:leading-relaxed"
        >
          <span className="lg:hidden">
            AI-generated portrait environment. Veo mark remains visible.
          </span>
          <span className="hidden lg:inline">
            AI-assisted portrait scene created from Wildan&apos;s approved likeness; the Veo
            provenance mark remains visible.
          </span>
        </figcaption>
        {control}
      </div>
    </figure>
  );
}
