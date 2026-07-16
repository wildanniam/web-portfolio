import Image from "next/image";
import type { ReactNode } from "react";

type HeroMediaFrameProps = {
  isReady?: boolean;
  children?: ReactNode;
  control: ReactNode;
};

export function HeroMediaFrame({ isReady = false, children, control }: HeroMediaFrameProps) {
  return (
    <figure className="media-surface relative aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-smoke-900">
      <Image
        src="/media/hero/hero-poster.jpg"
        alt="An analog-futurist system with an ember signal moving through processing modules toward an evidence chamber."
        fill
        priority
        fetchPriority="high"
        sizes="(min-width: 1024px) 48vw, 100vw"
        className={`object-cover transition-opacity duration-500 ${isReady ? "opacity-0" : "opacity-100"}`}
      />

      {children}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/68 via-black/18 to-transparent p-4 pt-16 sm:p-5">
        <figcaption className="max-w-[32rem] text-xs leading-relaxed text-white/78">
          AI-generated system visualization. Signal, processing, human checkpoint, and evidence.
        </figcaption>
        {control}
      </div>
    </figure>
  );
}
