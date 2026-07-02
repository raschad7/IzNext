"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedLogoProps {
  className?: string;
  color?: string;
  onHoverAnimate?: boolean;
  initialFolded?: boolean;
  autoPlayUnfold?: boolean;
}

export function AnimatedLogo({
  className = "",
  color = "#0C388D",
  onHoverAnimate = true,
  initialFolded = false,
  autoPlayUnfold = false,
}: AnimatedLogoProps) {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play unfold sequence for the loading screen
  useEffect(() => {
    if (autoPlayUnfold) {
      const runAutoPlay = async () => {
        setIsAnimating(true);
        // Wait a tiny bit before starting so the user sees the folded state
        await new Promise((r) => setTimeout(r, 400));
        await controls.start("phase2");
        await controls.start("phase1");
        await controls.start("original");
        setIsAnimating(false);
      };
      runAutoPlay();
    }
  }, [autoPlayUnfold, controls]);

  const handleHover = async () => {
    if (!onHoverAnimate || isAnimating) return;
    setIsAnimating(true);
    
    // Fold sequence
    await controls.start("phase1");
    await controls.start("phase2");
    await controls.start("phase3");
    
    // Unfold sequence (reverse)
    await controls.start("phase2");
    await controls.start("phase1");
    await controls.start("original");
    
    setIsAnimating(false);
  };

  const transition = { duration: 0.25, ease: "easeInOut" as const };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      onMouseEnter={handleHover}
      initial={initialFolded ? "phase3" : "original"}
      animate={controls}
    >
      {/* Top Left Square (Stays static) */}
      <rect y="0" width="12" height="12" fill={color} />

      {/* Top Right Square */}
      <motion.rect
        x="24"
        width="12"
        height="12"
        fill={color}
        variants={{
          original: { x: 0, y: 0 },
          phase1: { x: 0, y: 0 },
          phase2: { x: 0, y: 0 },
          phase3: { x: -24, y: 0 },
        }}
        transition={transition}
      />

      {/* Middle Triangle */}
      <motion.path
        d="M24 12 H11.65 V24.35Z"
        fill={color}
        variants={{
          original: { x: 0, y: 0 },
          phase1: { x: 0, y: 0 },
          phase2: { x: 12, y: -12 },
          phase3: { x: -12, y: -12 },
        }}
        transition={transition}
      />

      {/* Left Triangle */}
      <motion.path
        d="M0 24H12V12Z"
        fill={color}
        variants={{
          original: { x: 0, y: 0 },
          phase1: { x: 0, y: 0 },
          phase2: { x: 24, y: -12 },
          phase3: { x: 0, y: -12 },
        }}
        transition={transition}
      />

      {/* Right Triangle */}
      <motion.path
        d="M24 24H36V12Z"
        fill={color}
        variants={{
          original: { x: 0, y: 0 },
          phase1: { x: 0, y: 0 },
          phase2: { x: 0, y: -12 },
          phase3: { x: -24, y: -12 },
        }}
        transition={transition}
      />

      {/* Bottom Left Square */}
      <motion.rect
        y="23.65"
        width="12.35"
        height="12.35"
        fill={color}
        variants={{
          original: { x: 0, y: 0 },
          phase1: { x: 0, y: -11.65 },
          phase2: { x: 24, y: -23.65 },
          phase3: { x: 0, y: -23.65 },
        }}
        transition={transition}
      />

      {/* Bottom Right Square */}
      <motion.rect
        x="24"
        y="23.65"
        width="12"
        height="12.35"
        fill={color}
        variants={{
          original: { x: 0, y: 0 },
          phase1: { x: 0, y: -11.65 },
          phase2: { x: 0, y: -23.65 },
          phase3: { x: -24, y: -23.65 },
        }}
        transition={transition}
      />
    </motion.svg>
  );
}
