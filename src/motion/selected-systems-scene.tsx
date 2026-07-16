"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SelectedSystemsScene({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mediaQueries = gsap.matchMedia();

      mediaQueries.add(
        {
          desktop: "(min-width: 1280px)",
          motionAllowed: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop, motionAllowed } = context.conditions ?? {};
          if (!desktop || !motionAllowed) return;

          const panels = gsap.utils.toArray<HTMLElement>("[data-system-panel]", root);
          const finalPanel = panels.at(-1);

          if (panels.length < 2 || !finalPanel) return;

          panels.forEach((panel, index) => {
            if (index === panels.length - 1) return;

            const surface = panel.querySelector<HTMLElement>("[data-system-surface]");
            const content = panel.querySelector<HTMLElement>("[data-system-content]");
            const nextPanel = panels[index + 1];
            if (!surface || !content || !nextPanel) return;

            ScrollTrigger.create({
              id: `selected-system-pin-${index + 1}`,
              trigger: panel,
              start: "top top+=88",
              endTrigger: finalPanel,
              end: "top top+=88",
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            });

            const recede = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                id: `selected-system-recede-${index + 1}`,
                trigger: nextPanel,
                start: "top bottom-=12%",
                end: "top top+=88",
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            });

            recede
              .to(surface, { scale: 0.94 + index * 0.015 }, 0)
              .to(content, { autoAlpha: 0.58 + index * 0.1 }, 0);
          });
        },
      );

      return () => mediaQueries.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-signature-scene="selected-systems">
      {children}
    </div>
  );
}
