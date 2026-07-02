"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

const IMAGES = [
  "/images/gallery-1.jpeg",
  "/images/gallery-2.jpeg",
  "/images/gallery-3.jpeg",
  "/images/gallery-4.jpeg",
]

/*
  Scroll-scrub gallery (the "Bespoke / Luxury" section).
  A pinned stage: the centered image grows from a small frame to full-bleed
  (1521x695) as you scroll, nudging the framing words outward then covering
  them. The source cross-fades through the 4 photos as the scrub continues.
*/
export default function ScrollGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end end"],
  })

  // Starts as a small SQUARE and grows across the whole section to full-bleed
  // 1521x695 (width grows faster than height -> "grows to full width").
  const width = useTransform(scrollYProgress, [0, 1], ["24vw", "100vw"])
  const height = useTransform(scrollYProgress, [0, 1], ["52vh", "100vh"])

  // Side words drift outward a touch as the image swells (barely noticeable).
  const bespokeX = useTransform(scrollYProgress, [0, 1], [0, -22])
  const luxuryX = useTransform(scrollYProgress, [0, 1], [0, 22])

  // The photo CHANGES WHILE it grows. Evenly distribute the 4 photos
  // over the scroll progress (swaps at 25% / 50% / 75%).
  const op0 = useTransform(scrollYProgress, [0, 0.249, 0.25], [1, 1, 0])
  const op1 = useTransform(
    scrollYProgress,
    [0.249, 0.25, 0.499, 0.50],
    [0, 1, 1, 0],
  )
  const op2 = useTransform(
    scrollYProgress,
    [0.499, 0.50, 0.749, 0.75],
    [0, 1, 1, 0],
  )
  const op3 = useTransform(scrollYProgress, [0.749, 0.75, 1], [0, 1, 1])
  const opacities = [op0, op1, op2, op3]

  return (
    <section ref={ref} className="relative h-[280vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Framing words (behind the image, so the growing image covers them) */}
        <div className="pointer-events-none absolute left-[3vw] top-1/2 z-0 -translate-y-1/2">
          <motion.span
            style={{ x: bespokeX }}
            className="block text-[48px] leading-none text-ink"
          >
            Bespoke
          </motion.span>
        </div>
        <div className="pointer-events-none absolute right-[3vw] top-1/2 z-0 -translate-y-1/2">
          <motion.span
            style={{ x: luxuryX }}
            className="block text-[48px] leading-none text-ink"
          >
            Luxury
          </motion.span>
        </div>
        <span className="pointer-events-none absolute left-1/2 top-[120px] z-0 -translate-x-1/2 text-[15px] text-ink">
          EST. 1990
        </span>
        <span className="pointer-events-none absolute bottom-[70px] left-1/2 z-0 -translate-x-1/2 text-[15px] text-ink">
          MELBOURNE
        </span>

        {/* Growing image stack */}
        <motion.div
          style={{ width, height }}
          className="relative z-10 overflow-hidden"
        >
          {IMAGES.map((src, i) => (
            <motion.div
              key={src}
              style={{ opacity: opacities[i] }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
