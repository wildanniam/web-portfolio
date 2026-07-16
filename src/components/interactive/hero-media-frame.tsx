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
      <Image
        src="/media/hero/wildan-human-checkpoint-poster.jpg"
        alt="Wildan Syukri Niam in a maroon blazer inside a warm analog-futurist research studio."
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={`object-cover transition-opacity duration-500 ${isReady ? "opacity-0" : "opacity-100"}`}
      />

      {children}

      <div className="hero-media-meta absolute right-4 bottom-4 z-20 flex max-w-[30rem] items-center justify-end gap-3 sm:right-8 sm:bottom-6 lg:right-12">
        <figcaption
          data-testid="hero-media-disclosure"
          className="max-w-[10.5rem] text-right text-[0.54rem] leading-[1.35] text-white/70 sm:max-w-[14rem] sm:text-[0.6rem] lg:max-w-[23rem] lg:text-[0.68rem] lg:leading-relaxed"
        >
          <span className="lg:hidden">
            AI-generated portrait environment. Gemini mark visible in motion.
          </span>
          <span className="hidden lg:inline">
            AI-generated environment based on Wildan&apos;s approved portrait; Gemini&apos;s
            provenance mark remains visible in motion mode.
          </span>
        </figcaption>
        {control}
      </div>
    </figure>
  );
}
