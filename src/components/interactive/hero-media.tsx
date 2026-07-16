"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type PlaybackState = "poster" | "loading" | "playing" | "paused" | "failed";

type NetworkInformation = {
  saveData?: boolean;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

function getEligibilitySnapshot() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wideEnough = window.matchMedia("(min-width: 768px)").matches;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;

  return !reduceMotion && !connection?.saveData && wideEnough;
}

function getEligibilityServerSnapshot() {
  return false;
}

function subscribeToEligibility(onChange: () => void) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const wideEnough = window.matchMedia("(min-width: 768px)");
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;

  reduceMotion.addEventListener("change", onChange);
  wideEnough.addEventListener("change", onChange);
  connection?.addEventListener?.("change", onChange);

  return () => {
    reduceMotion.removeEventListener("change", onChange);
    wideEnough.removeEventListener("change", onChange);
    connection?.removeEventListener?.("change", onChange);
  };
}

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const isEligible = useSyncExternalStore(
    subscribeToEligibility,
    getEligibilitySnapshot,
    getEligibilityServerSnapshot,
  );
  const [isReady, setIsReady] = useState(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("poster");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isEligible) return;

    const resumeIfAllowed = () => {
      if (!userPausedRef.current && document.visibilityState === "visible") {
        void video.play().catch(() => setPlaybackState("paused"));
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        resumeIfAllowed();
      },
      { threshold: 0.2 },
    );

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") video.pause();
      else resumeIfAllowed();
    };

    observer.observe(video);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isEligible]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      try {
        await video.play();
        setPlaybackState("playing");
      } catch {
        setPlaybackState("failed");
      }
    } else {
      userPausedRef.current = true;
      setPlaybackState("paused");
      video.pause();
    }
  };

  return (
    <figure className="media-surface relative aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-smoke-900">
      <Image
        src="/media/hero/hero-poster.jpg"
        alt="An analog-futurist system with an ember signal moving through processing modules toward an evidence chamber."
        fill
        priority
        sizes="(min-width: 1024px) 48vw, 100vw"
        className={`object-cover transition-opacity duration-500 ${isReady ? "opacity-0" : "opacity-100"}`}
      />

      {isEligible ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
          onLoadStart={() => setPlaybackState("loading")}
          onCanPlay={() => {
            setIsReady(true);
            setPlaybackState("playing");
          }}
          onPlay={() => {
            if (userPausedRef.current) {
              videoRef.current?.pause();
              setPlaybackState("paused");
            } else {
              setPlaybackState("playing");
            }
          }}
          onPause={() => setPlaybackState("paused")}
          onError={() => setPlaybackState("failed")}
        >
          <source src="/media/hero/hero-desktop.webm" type="video/webm" />
          <source src="/media/hero/hero-desktop.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/68 via-black/18 to-transparent p-4 pt-16 sm:p-5">
        <figcaption className="max-w-[32rem] text-xs leading-relaxed text-white/78">
          AI-generated system visualization. Signal, processing, human checkpoint, and evidence.
        </figcaption>

        {isEligible ? (
          <button
            type="button"
            onClick={togglePlayback}
            className="min-h-11 shrink-0 rounded-full border border-white/28 bg-black/45 px-4 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/65"
            aria-label={playbackState === "playing" ? "Pause hero animation" : "Play hero animation"}
          >
            {playbackState === "playing" ? "Pause" : "Play"}
          </button>
        ) : (
          <span className="rounded-full border border-white/20 bg-black/35 px-3 py-2 font-mono text-[0.65rem] text-white/75">
            STILL MODE
          </span>
        )}
      </div>
    </figure>
  );
}
