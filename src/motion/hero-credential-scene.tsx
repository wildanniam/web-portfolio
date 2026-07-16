"use client";

import { useEffect, useRef } from "react";

const ROOT_SELECTOR = '[data-signature-scene="hero-credential"]';

export function HeroCredentialSceneController() {
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
        const media = root.querySelector<HTMLElement>("[data-hero-media-frame]");
        const copy = root.querySelector<HTMLElement>("[data-hero-copy]");
        const heroPin = root.querySelector<HTMLElement>("[data-hero-pin]");
        const heroSignal = root.querySelector<HTMLElement>("[data-hero-signal]");
        const heroSignalHead = root.querySelector<HTMLElement>("[data-hero-signal-head]");
        const credentialScene = root.querySelector<HTMLElement>("[data-credential-scene]");
        const credentialSignal = root.querySelector<HTMLElement>("[data-credential-signal]");
        const credentialStage = root.querySelector<HTMLElement>("[data-credential-gsap-stage]");
        const lanyardAnchor = root.querySelector<HTMLElement>("[data-lanyard-anchor]");

        if (
          !media ||
          !copy ||
          !heroPin ||
          !heroSignal ||
          !heroSignalHead ||
          !credentialScene ||
          !credentialSignal ||
          !credentialStage ||
          !lanyardAnchor
        ) {
          return;
        }

        gsap.set([heroSignal, credentialSignal], {
          scaleY: 0,
          transformOrigin: "top center",
        });
        gsap.set(heroSignalHead, { autoAlpha: 0, y: -12 });

        const handoff = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "hero-credential-handoff",
            trigger: heroPin,
            start: "top top+=72",
            end: "+=70%",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        handoff
          .addLabel("signal", 0)
          .to(media, { x: -24, y: 18, scale: 0.945 }, "signal")
          .to(copy, { y: -10, autoAlpha: 0.78 }, "signal")
          .to(heroSignal, { scaleY: 1 }, "signal+=0.08")
          .to(heroSignalHead, { y: 34, autoAlpha: 1 }, "signal+=0.44");

        gsap.fromTo(
          credentialSignal,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              id: "credential-signal-arrival",
              trigger: credentialScene,
              start: "top 78%",
              end: "top 42%",
              scrub: 0.65,
            },
          },
        );

        const arrival = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "credential-stage-arrival",
            trigger: credentialScene,
            start: "top 68%",
            end: "top 24%",
            scrub: 0.7,
          },
        });

        arrival
          .fromTo(credentialStage, { y: -64 }, { y: 0 }, 0)
          .fromTo(lanyardAnchor, { scale: 0.65 }, { scale: 1 }, 0.2);
      }, root);

      revertScene = () => scene.revert();
    };

    const start = () => void initialize();
    const passiveOnce = { once: true, passive: true } as const;

    window.addEventListener("wheel", start, passiveOnce);
    window.addEventListener("touchstart", start, passiveOnce);
    window.addEventListener("pointerdown", start, passiveOnce);
    window.addEventListener("keydown", start, { once: true });

    // Keep the first render free of GSAP work, but make the scene ready before
    // a typical user reaches the first scroll handoff.
    const fallbackTimer = window.setTimeout(start, 5_000);

    return () => {
      disposed = true;
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("wheel", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      revertScene?.();
    };
  }, []);

  return <span ref={markerRef} hidden aria-hidden="true" />;
}
