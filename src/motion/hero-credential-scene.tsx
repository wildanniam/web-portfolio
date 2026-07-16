"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroCredentialScene({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

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

      const mediaQueries = gsap.matchMedia();

      mediaQueries.add(
        {
          desktop: "(min-width: 1280px)",
          motionAllowed: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop, motionAllowed } = context.conditions ?? {};
          if (!desktop || !motionAllowed) return;

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
        },
      );

      return () => mediaQueries.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-signature-scene="hero-credential">
      {children}
    </div>
  );
}
