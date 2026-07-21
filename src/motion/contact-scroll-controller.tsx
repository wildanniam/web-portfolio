"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ContactScrollController() {
  const pathname = usePathname();

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".contact-stage");
    const word = stage?.querySelector<HTMLElement>(".contact-stage__word-frame");

    if (!stage || !word) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;

      if (reducedMotion.matches) {
        word.style.transform = "none";
        return;
      }

      const bounds = stage.getBoundingClientRect();
      const progress = clamp(
        (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height),
      );

      word.style.transform = `translate3d(0, ${-20 + progress * 50}%, 0)`;
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      word.style.transform = "";
    };
  }, [pathname]);

  return null;
}
