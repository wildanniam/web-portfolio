"use client";

import { useEffect, useRef, useState } from "react";

import { HeroMediaFrame } from "@/components/interactive/hero-media-frame";

type PlaybackState = "poster" | "loading" | "playing" | "paused" | "ended" | "failed";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const endedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [hasActivatedAudio, setHasActivatedAudio] = useState(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("poster");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resumeIfAllowed = () => {
      if (
        !userPausedRef.current &&
        !endedRef.current &&
        document.visibilityState === "visible"
      ) {
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

  const handlePlaybackControl = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasActivatedAudio || playbackState === "ended") {
      setHasActivatedAudio(true);
      userPausedRef.current = false;
      endedRef.current = false;
      video.loop = false;
      video.muted = false;
      video.currentTime = 0;

      try {
        await video.play();
        setPlaybackState("playing");
      } catch {
        video.muted = true;
        video.loop = true;
        setPlaybackState("paused");
      }

      return;
    }

    if (!video.paused) {
      userPausedRef.current = true;
      setPlaybackState("paused");
      video.pause();

      return;
    }

    userPausedRef.current = false;
    video.loop = false;
    video.muted = false;

    try {
      await video.play();
      setPlaybackState("playing");
    } catch {
      setPlaybackState("paused");
    }
  };

  const controlLabel = !hasActivatedAudio
    ? "Hear intro"
    : playbackState === "playing"
      ? "Pause intro"
      : playbackState === "ended"
        ? "Replay intro"
        : "Resume intro";

  return (
    <HeroMediaFrame
      isReady={isReady}
      control={
        playbackState === "failed" ? (
          <span className="rounded-full border border-white/20 bg-black/40 px-3 py-2 font-mono text-[0.65rem] text-white/75">
            POSTER MODE
          </span>
        ) : (
          <button
            type="button"
            onClick={handlePlaybackControl}
            className="min-h-11 shrink-0 rounded-full border border-white/28 bg-black/50 px-4 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={controlLabel}
          >
            {controlLabel}
          </button>
        )
      }
    >
      <p className="sr-only">
        Video introduction from Wildan welcoming visitors to his portfolio. Use the Hear intro
        button to play the spoken introduction.
      </p>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        poster="/media/hero/wildan-hero-poster.jpg"
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
        onEnded={() => {
          endedRef.current = true;
          userPausedRef.current = true;
          setPlaybackState("ended");
        }}
        onError={() => {
          setIsReady(false);
          setPlaybackState("failed");
        }}
      >
        <source src="/media/hero/wildan-hero-video.webm" type="video/webm" />
        <source src="/media/hero/wildan-hero-video.mp4" type="video/mp4" />
      </video>
    </HeroMediaFrame>
  );
}
