"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

const COLLABS = [
  {
    company: "Cumulus Studio",
    desc: "Award winning architecture",
    img: "/images/collab1.jpeg",
    footerText: "Award winning architecture",
  },
  {
    company: "Sussex",
    desc: "Australian leading tapware",
    img: "/images/collab2.jpeg",
    footerText: "Australian leading tapware",
  },
  {
    company: "Sketch Design & Interiors",
    desc: "Architects",
    img: "/images/collab3.jpeg",
    footerText: "Architects",
  },
  {
    company: "Miele",
    desc: "Premium appliances",
    img: "/images/collab4.jpeg",
    footerText: "Finishing touches added with Miele",
  },
  {
    company: "Bespoke",
    desc: "Windows and doors",
    img: "/images/collab5.jpeg",
    footerText: "High-end Bespoke windows and doors",
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
  }),
}

export default function Collaborators() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const tableRowsRef = useRef<(HTMLDivElement | null)[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [cursorText, setCursorText] = useState("Next")

  const cursorRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const footerTextRef = useRef<HTMLDivElement>(null)
  const quickX = useRef<any>(null)
  const quickY = useRef<any>(null)

  // Setup GSAP text reveals
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      /* ── Dot (scale in) ── */
      gsap.from(dotRef.current, {
        scale: 0,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: { trigger: dotRef.current, start: "top 85%", once: true },
      })

      /* ── Label ── */
      const labelSplit = SplitText.create(labelRef.current!, { type: "lines", mask: "lines" })
      gsap.from(labelSplit.lines, {
        yPercent: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 85%", once: true },
      })

      /* ── Paragraph ── */
      const pSplit = SplitText.create(paraRef.current!, { type: "lines", mask: "lines" })
      gsap.from(pSplit.lines, {
        yPercent: 100,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: paraRef.current, start: "top 85%", once: true },
      })

      /* ── Table Rows ── */
      gsap.from(tableRowsRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 85%",
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Slider footer text animation
  useEffect(() => {
    if (!footerTextRef.current) return
    gsap.fromTo(
      footerTextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" }
    )
  }, [currentIndex])

  // Custom cursor logic
  useEffect(() => {
    if (!cursorRef.current) return
    quickX.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" })
    quickY.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" })
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current || !quickX.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    quickX.current(x)
    quickY.current(y)

    // Update cursor text based on half
    if (x < rect.width / 2) {
      if (cursorText !== "Prev") setCursorText("Prev")
    } else {
      if (cursorText !== "Next") setCursorText("Next")
    }
  }

  const handleMouseEnter = () => {
    gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3 })
  }

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, { opacity: 0, scale: 0.8, duration: 0.3 })
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left

    if (x < rect.width / 2) {
      setDirection(-1)
      setCurrentIndex((prev) => (prev === 0 ? COLLABS.length - 1 : prev - 1))
    } else {
      setDirection(1)
      setCurrentIndex((prev) => (prev === COLLABS.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <section ref={sectionRef} className="relative z-10 bg-white text-ink py-[120px]">
      <div className="mx-auto max-w-[1840px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-5">
          
          {/* ── Left Column: Text & Table ── */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-16">
              <span ref={dotRef} className="inline-block w-[7px] h-[7px] bg-ink" />
              <span ref={labelRef} className="text-[14px] leading-[22px]">
                Our collaborators
              </span>
            </div>

            <p ref={paraRef} className="text-[17px] leading-[28px]">
              Haven partners with leading architects and designers to realise
              ideas with integrity and precision. Our relationships are built on
              trust, detail, and shared respect for design.
            </p>

            {/* Table */}
            <div ref={tableRef} className="mt-16 w-full max-w-[445px] h-[185px] flex flex-col justify-between">
              {COLLABS.map((collab, i) => (
                <div
                  key={i}
                  ref={(el) => { tableRowsRef.current[i] = el }}
                  className="flex justify-between border-b border-ink/15 pb-2 text-[14px] leading-[22px] text-ink"
                >
                  <span>{collab.company}</span>
                  <span>{collab.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Image Slider ── */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-5 mt-20 lg:mt-0 flex lg:justify-end">
            <div className="w-full">
            <div
              ref={sliderRef}
              className="relative w-full max-w-[936px] overflow-hidden cursor-none"
              style={{ aspectRatio: "936 / 736" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              {/* Images with framer-motion AnimatePresence */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 z-10"
                >
                  <Image
                    src={COLLABS[currentIndex].img}
                    alt={COLLABS[currentIndex].company}
                    fill
                    quality={90}
                    unoptimized
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Custom text cursor */}
              <div
                ref={cursorRef}
                className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2 text-white text-[56px] tracking-tight whitespace-nowrap"
                style={{ opacity: 0, scale: 0.8, top: 0, left: 0 }}
              >
                {cursorText}
              </div>
            </div>

            {/* Slider footer */}
            <div className="flex justify-between items-center mt-6 max-w-[936px]">
              <div className="text-[16px] leading-[24px]">
                {currentIndex + 1}/{COLLABS.length}
              </div>
              <div className="text-[16px] leading-[24px] overflow-hidden">
                <div ref={footerTextRef}>
                  {COLLABS[currentIndex].footerText}
                </div>
              </div>
            </div>
          </div>
          </div>

        </div>
      </div>
    </section>
  )
}
