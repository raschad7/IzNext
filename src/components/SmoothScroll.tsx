"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/*
  Smooth-scroll layer (Lenis) — gives the slow, weighted momentum feel the
  live Haven site uses, and drives the scroll-linked reveals smoothly.
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

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
