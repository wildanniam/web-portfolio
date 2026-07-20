import Image from "next/image";

import type { MediaSlot } from "@/content/schema";

export function ProjectMedia({ media }: { media: MediaSlot }) {
  if (media.state === "placeholder") {
    return (
      <div
        className="grid aspect-[16/10] place-items-center overflow-hidden rounded-[1.25rem] border border-line-200 bg-[radial-gradient(circle_at_30%_20%,rgba(198,94,46,0.12),transparent_30%),linear-gradient(145deg,#ece4d8,#dfd3c3)] p-7"
        role="img"
        aria-label={`Placeholder for ${media.label}`}
      >
        <div className="max-w-64 text-center">
          <span className="font-mono text-[0.64rem] tracking-[0.12em] text-ember-700">ASSET IN REVIEW</span>
          <p className="mt-3 text-sm leading-6 text-ink-600">{media.label}</p>
        </div>
      </div>
    );
  }

  const width = media.state === "published" ? media.width : 1600;
  const height = media.state === "published" ? media.height : 1000;

  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={width}
      height={height}
      className="aspect-[16/10] w-full rounded-[1.25rem] border border-line-200 object-cover"
    />
  );
}
