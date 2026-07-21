"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ContactBackdropWord() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-9%", "15%"]);

  return (
    <div ref={sectionRef} className="contact-stage__word-frame" aria-hidden="true">
      <motion.div
        className="contact-stage__word-motion"
        style={{ y: reduceMotion ? 0 : parallaxY }}
      >
        <span className="contact-stage__word">CONTACT</span>
      </motion.div>
    </div>
  );
}
