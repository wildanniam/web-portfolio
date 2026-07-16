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
        src="/media/hero/hero-poster.jpg"
        alt="An analog-futurist system with an ember signal moving through processing modules toward an evidence chamber."
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={`object-cover transition-opacity duration-500 ${isReady ? "opacity-0" : "opacity-100"}`}
      />

      {children}

      <div className="hero-media-meta absolute right-4 bottom-4 z-20 flex max-w-[30rem] items-center justify-end gap-3 sm:right-8 sm:bottom-6 lg:right-12">
        <figcaption className="hidden max-w-[23rem] text-right text-[0.68rem] leading-relaxed text-white/68 lg:block">
          AI-generated system visualization. Signal, processing, human checkpoint, and evidence.
        </figcaption>
        {control}
      </div>
    </figure>
  );
}
