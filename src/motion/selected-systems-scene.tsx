"use client";

import { useEffect, useRef } from "react";

const ROOT_SELECTOR = '[data-signature-scene="selected-systems"]';

export function SelectedSystemsSceneController() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = markerRef.current?.closest<HTMLElement>(ROOT_SELECTOR);
    const desktop = window.matchMedia("(min-width: 1280px)").matches;
    const motionAllowed = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    if (!root || !desktop || !motionAllowed) return;

    let disposed = false;
    let loading = false;
    let revertScene: (() => void) | undefined;

    const initialize = async () => {
      if (loading || disposed) return;
      loading = true;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const scene = gsap.context(() => {
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
      }, root);

      revertScene = () => scene.revert();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void initialize();
      },
      { rootMargin: "100% 0px" },
    );

    observer.observe(root);

    return () => {
      disposed = true;
      observer.disconnect();
      revertScene?.();
    };
  }, []);

  return <span ref={markerRef} hidden aria-hidden="true" />;
}
