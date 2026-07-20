"use client";

import { useEffect, useState } from "react";

import styles from "./entry-gate.module.css";

export const ENTRY_POSTER_SRC = "/media/hero/wildan-hero-poster.jpg";

const MINIMUM_VISIBLE_MS = 650;
const MAXIMUM_WAIT_MS = 1400;
const EXIT_DURATION_MS = 480;

type GatePhase = "waiting" | "leaving" | "gone";

export function EntryGate() {
  const [phase, setPhase] = useState<GatePhase>("waiting");

  useEffect(() => {
    const root = document.documentElement;

    if (root.dataset.entryGate !== "show") {
      return;
    }

    let minimumElapsed = false;
    let posterReady = false;
    let leaving = false;
    let exitTimer = 0;

    const complete = () => {
      if (root.dataset.entryGate !== "show") return;
      if (leaving || (!minimumElapsed || !posterReady)) return;

      leaving = true;
      root.dataset.entryGate = "leaving";
      setPhase("leaving");
      exitTimer = window.setTimeout(() => {
        try {
          window.sessionStorage.setItem("wildan-entry-seen", "1");
        } catch {
          // Storage can be unavailable in privacy-focused browsing modes.
        }

        root.dataset.entryGate = "complete";
        setPhase("gone");
      }, EXIT_DURATION_MS);
    };

    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true;
      complete();
    }, MINIMUM_VISIBLE_MS);

    const maximumTimer = window.setTimeout(() => {
      posterReady = true;
      minimumElapsed = true;
      complete();
    }, MAXIMUM_WAIT_MS);

    const poster = new Image();
    const markPosterReady = () => {
      posterReady = true;
      complete();
    };

    poster.decoding = "async";
    poster.onload = markPosterReady;
    poster.onerror = markPosterReady;
    poster.src = ENTRY_POSTER_SRC;
    if (poster.complete) markPosterReady();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotion = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      posterReady = true;
      minimumElapsed = true;
      complete();
    };
    reducedMotion.addEventListener("change", handleReducedMotion);

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(maximumTimer);
      window.clearTimeout(exitTimer);
      reducedMotion.removeEventListener("change", handleReducedMotion);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={styles.gate}
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label="Opening Wildan's portfolio"
    >
      <div className={styles.inner}>
        <div className={styles.meta} aria-hidden="true">
          <span>Full-Stack Builder</span>
          <span>Bandung / ID</span>
        </div>
        <p className={styles.wordmark} aria-hidden="true">
          Wildan<span className={styles.dot}>.</span>
        </p>
        <div className={styles.rail} aria-hidden="true">
          <span className={styles.trace} />
          <span className={styles.signal} />
        </div>
        <p className={styles.caption} aria-hidden="true">
          Warming up the studio
        </p>
      </div>
    </div>
  );
}
