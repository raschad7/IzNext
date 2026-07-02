"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  Smooth-scroll layer (Lenis) — gives the slow, weighted momentum feel the
  live Haven site uses, and drives the scroll-linked reveals smoothly.

  Lenis is synced with GSAP's ticker and ScrollTrigger so that
  scrub-based animations track the interpolated scroll position.
*/
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // higher = slower, more glide
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      smoothWheel: true,
    });

    // Forward every Lenis scroll event to ScrollTrigger so scrub
    // animations read the correct (interpolated) scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's unified ticker instead of a separate
    // requestAnimationFrame loop — keeps everything in sync.
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
