import { HeroMediaFrame } from "@/components/interactive/hero-media-frame";

export function HeroMediaStatic() {
  return (
    <HeroMediaFrame
      control={
        <span className="rounded-full border border-white/20 bg-black/35 px-3 py-2 font-mono text-[0.65rem] text-white/75">
          STILL MODE
        </span>
      }
    />
  );
}

