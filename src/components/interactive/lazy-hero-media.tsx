"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";

type InteractiveHero = ComponentType;

type LazyHeroMediaProps = {
  fallback: ReactNode;
};

type NetworkInformation = {
  saveData?: boolean;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

function canLoadVideo() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;

  return (
    window.matchMedia("(min-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !connection?.saveData
  );
}

export function LazyHeroMedia({ fallback }: LazyHeroMediaProps) {
  const [isEligible, setIsEligible] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [InteractiveHero, setInteractiveHero] = useState<InteractiveHero | null>(null);

  useEffect(() => {
    const width = window.matchMedia("(min-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const syncEligibility = () => setIsEligible(canLoadVideo());

    syncEligibility();
    width.addEventListener("change", syncEligibility);
    motion.addEventListener("change", syncEligibility);
    connection?.addEventListener?.("change", syncEligibility);

    return () => {
      width.removeEventListener("change", syncEligibility);
      motion.removeEventListener("change", syncEligibility);
      connection?.removeEventListener?.("change", syncEligibility);
    };
  }, []);

  useEffect(() => {
    if (!isEligible) return;

    let active = true;

    void import("@/components/interactive/hero-media")
      .then(({ HeroMedia }) => {
        if (active) setInteractiveHero(() => HeroMedia);
      })
      .catch(() => {
        if (active) setLoadFailed(true);
      });

    return () => {
      active = false;
    };
  }, [isEligible]);

  return isEligible && !loadFailed && InteractiveHero ? <InteractiveHero /> : fallback;
}
