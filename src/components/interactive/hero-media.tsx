"use client";

import { useEffect, useRef, useState } from "react";

import { HeroMediaFrame } from "@/components/interactive/hero-media-frame";

type PlaybackState = "poster" | "loading" | "playing" | "paused" | "failed";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("poster");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
  }, []);

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
    <HeroMediaFrame
      isReady={isReady}
      control={
        <button
          type="button"
          onClick={togglePlayback}
          className="min-h-11 shrink-0 rounded-full border border-white/28 bg-black/45 px-4 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/65"
          aria-label={playbackState === "playing" ? "Pause hero animation" : "Play hero animation"}
        >
          {playbackState === "playing" ? "Pause" : "Play"}
        </button>
      }
    >
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
        onCanPlay={(event) => {
          setIsReady(true);
          setPlaybackState(event.currentTarget.paused ? "paused" : "playing");
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
        <source src="/media/hero/wildan-human-checkpoint-loop.webm" type="video/webm" />
        <source src="/media/hero/wildan-human-checkpoint-loop.mp4" type="video/mp4" />
      </video>
    </HeroMediaFrame>
  );
}
