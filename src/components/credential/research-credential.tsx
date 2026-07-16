"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useState,
  useSyncExternalStore,
} from "react";

type ResearchCredentialProps = {
  aboutQrDataUrl: string;
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

export function ResearchCredential({ aboutQrDataUrl }: ResearchCredentialProps) {
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
      <div className="credential-lanyard" aria-hidden="true">
        <div className="credential-lanyard__strap credential-lanyard__strap--left">
          <span>EVIDENCE OVER ASSERTION</span>
        </div>
        <div className="credential-lanyard__strap credential-lanyard__strap--right">
          <span>EVIDENCE OVER ASSERTION</span>
        </div>
        <div className="credential-lanyard__clasp">
          <span />
        </div>
      </div>

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
            <div
              className="credential-face credential-face--front"
              aria-hidden={isBackVisible}
            >
              <div className="credential-face__topline">
                <span>RESEARCH CREDENTIAL</span>
                <span>WSN</span>
              </div>

              <div className="credential-portrait">
                <Image
                  src="/media/profile/wildan-credential.jpg"
                  alt="Wildan Syukri Niam at a technology event, wearing a maroon blazer."
                  fill
                  sizes="(min-width: 768px) 22rem, 78vw"
                  className="object-cover"
                  priority={false}
                />
                <span className="credential-portrait__index" aria-hidden="true">
                  HUMAN CHECKPOINT
                </span>
              </div>

              <div className="credential-identity">
                <p>Wildan Syukri Niam</p>
                <strong>Researcher &amp; Builder</strong>
                <span>AI agents / Web3 trust / on-chain intelligence</span>
              </div>

              <div className="credential-face__footer">
                <span>PUBLIC PROFILE</span>
                <span>VERIFIED 15 JUL 2026</span>
              </div>
            </div>

            <div
              className="credential-face credential-face--back"
              aria-hidden={!isBackVisible}
            >
              <div className="credential-back__header">
                <span>WORKING METHOD</span>
                <strong>Evidence before confidence.</strong>
              </div>

              <ol className="credential-method">
                <li>
                  <span>01</span>
                  <strong>Frame the risk</strong>
                </li>
                <li>
                  <span>02</span>
                  <strong>Build the mechanism</strong>
                </li>
                <li>
                  <span>03</span>
                  <strong>Expose the evidence</strong>
                </li>
                <li>
                  <span>04</span>
                  <strong>Test the boundary</strong>
                </li>
              </ol>

              <div className="credential-qr-row">
                <div className="credential-qr">
                  {/* The generated QR encodes this deployment's absolute /about URL. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={aboutQrDataUrl} alt="QR code linking to Wildan's about page." />
                </div>
                <div>
                  <span>FULL PROFILE</span>
                  <strong>Scan to inspect the research trail.</strong>
                </div>
              </div>

              <p className="credential-boundary">
                Public claims stay scoped to inspectable artifacts, current status, and stated
                limitations.
              </p>
            </div>
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
        <Link href="/about">
          Open full profile
        </Link>
      </div>
    </div>
  );
}
