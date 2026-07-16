"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useState,
  useSyncExternalStore,
} from "react";

import {
  CredentialFaces,
  CredentialLanyard,
} from "@/components/credential/credential-shell";

type ResearchCredentialProps = {
  aboutQrSrc: string;
};

const tiltSpring = {
  stiffness: 190,
  damping: 24,
  mass: 0.7,
};

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function ResearchCredential({ aboutQrSrc }: ResearchCredentialProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [isBackVisible, setIsBackVisible] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, tiltSpring);
  const rotateY = useSpring(rawRotateY, tiltSpring);

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    rawRotateX.set(vertical * -7);
    rawRotateY.set(horizontal * 8);
  };

  const toggleFace = () => setIsBackVisible((visible) => !visible);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleFace();
  };

  return (
    <div className="credential-rig" aria-label="Interactive research credential">
      <CredentialLanyard />

      <motion.div
        className="credential-swing"
        initial={false}
        animate={{ rotateZ: hasSettled ? [0, -2.4, 1.15, -0.55, 0] : 0 }}
        onViewportEnter={() => {
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setHasSettled(true);
          }
        }}
        viewport={{ once: true, amount: 0.58 }}
        transition={{
          duration: 1.3,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.18, 0.48, 0.74, 1],
        }}
      >
        <motion.div
          className="credential-tilt"
          style={{ rotateX, rotateY }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <motion.div
            role="button"
            tabIndex={0}
            aria-pressed={isBackVisible}
            aria-label={
              isBackVisible
                ? "Show front of Wildan's research credential"
                : "Show back of Wildan's research credential"
            }
            id="research-credential-card"
            data-testid="research-credential"
            data-face={isBackVisible ? "back" : "front"}
            className="credential-card"
            animate={{ rotateY: isBackVisible ? 180 : 0 }}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
            }
            onClick={toggleFace}
            onKeyDown={handleKeyDown}
          >
            <CredentialFaces aboutQrSrc={aboutQrSrc} isBackVisible={isBackVisible} />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="credential-controls">
        <button
          type="button"
          onClick={toggleFace}
          aria-controls="research-credential-card"
          aria-pressed={isBackVisible}
        >
          {isBackVisible ? "Show front" : "Turn credential"}
        </button>
        <Link href="/about">Open full profile</Link>
      </div>
    </div>
  );
}
