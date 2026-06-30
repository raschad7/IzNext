"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/*
  Intro video — slides up over the pinned hero. As it enters, the sides
  un-clip (clip-path inset 3%/4% -> 0), so the footage "grows" to full-bleed,
  matching the live site. Ends as a full 100vw x 100vh panel.
*/
export default function IntroVideo() {
  const ref = useRef<HTMLDivElement>(null);

  // 0 while the panel is still below the fold, 1 once it reaches the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Starts 1427px wide (47px ≈ 3.09% inset each side) and opens to full 1521px.
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0px 3.09% 0px 3.09%)", "inset(0px 0% 0px 0%)"]
  );

  return (
    <section ref={ref} className="relative z-10 h-screen w-full bg-white">
      <motion.div
        style={{ clipPath }}
        className="absolute inset-0 h-full w-full overflow-hidden"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </section>
  );
}
