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
    <div className="credential-rig" aria-label="Interactive builder pass">
      <motion.div
        className="credential-swing"
        initial={
          reduceMotion ? false : { y: -112, rotateZ: -2.4, opacity: 0 }
        }
        animate={
          reduceMotion
            ? { y: 0, rotateZ: 0, opacity: 1 }
            : undefined
        }
        whileInView={
          reduceMotion ? undefined : { y: 0, rotateZ: 0, opacity: 1 }
        }
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          y: {
            type: "spring",
            stiffness: 105,
            damping: 17,
            mass: 0.92,
          },
          rotateZ: {
            type: "spring",
            stiffness: 95,
            damping: 16,
            mass: 0.88,
          },
          opacity: { duration: 0.18, ease: "easeOut" },
        }}
      >
        <CredentialLanyard />
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
                ? "Show front of Wildan's builder pass"
                : "Show back of Wildan's builder pass"
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
          {isBackVisible ? "Show front" : "Flip pass"}
        </button>
        <Link href="/about">Open full profile</Link>
      </div>
    </div>
  );
}
