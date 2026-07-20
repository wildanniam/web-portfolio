"use client";

import { type ComponentType, type ReactNode, useEffect, useRef, useState } from "react";

type InteractiveCredential = ComponentType<{ aboutQrSrc: string }>;

type LazyResearchCredentialProps = {
  aboutQrSrc: string;
  fallback: ReactNode;
};

export function LazyResearchCredential({
  aboutQrSrc,
  fallback,
}: LazyResearchCredentialProps) {
  const markerRef = useRef<HTMLSpanElement>(null);
  const [InteractiveCredential, setInteractiveCredential] =
    useState<InteractiveCredential | null>(null);

  useEffect(() => {
    const stage = markerRef.current?.closest<HTMLElement>("[data-credential-gsap-stage]");
    if (!stage) return;

    let disposed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        void import("@/components/credential/research-credential").then((module) => {
          if (!disposed) setInteractiveCredential(() => module.ResearchCredential);
        });
      },
      { rootMargin: "25% 0px" },
    );

    observer.observe(stage);

    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <span ref={markerRef} hidden aria-hidden="true" />
      {InteractiveCredential ? (
        <InteractiveCredential aboutQrSrc={aboutQrSrc} />
      ) : (
        fallback
      )}
    </>
  );
}
