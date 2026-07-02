"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, EffectCreative } from "swiper/modules"
import type { Swiper as SwiperClass } from "swiper/types"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-creative"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

type Collab = {
  company: string
  desc: string
  img: string
  footerText: string
}

const COLLABS: Collab[] = [
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

export default function Collaborators() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const tableRowsRef = useRef<(HTMLDivElement | null)[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [cursorText, setCursorText] = useState<"Prev" | "Next">("Next")

  const cursorRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const footerTextRef = useRef<HTMLDivElement>(null)

  const swiperPrevRef = useRef<HTMLButtonElement>(null)
  const swiperNextRef = useRef<HTMLButtonElement>(null)

  const quickX = useRef<gsap.QuickToFunc | null>(null)
  const quickY = useRef<gsap.QuickToFunc | null>(null)
  const isHovered = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })

  /* ── GSAP text reveals ── */
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(dotRef.current, {
        scale: 0,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: dotRef.current,
          start: "top 85%",
          once: true,
        },
      })

      const labelSplit = SplitText.create(labelRef.current!, {
        type: "lines",
        mask: "lines",
      })
      gsap.from(labelSplit.lines, {
        yPercent: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 85%",
          once: true,
        },
      })

      const pSplit = SplitText.create(paraRef.current!, {
        type: "lines",
        mask: "lines",
      })
      gsap.from(pSplit.lines, {
        yPercent: 100,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: paraRef.current,
          start: "top 85%",
          once: true,
        },
      })

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

  /* ── Slider footer text animation ── */
  useEffect(() => {
    if (!footerTextRef.current || !counterRef.current) return
    gsap.fromTo(
      [counterRef.current, footerTextRef.current],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
    )
  }, [currentIndex])

  /* ── Custom cursor logic ── */
  useEffect(() => {
    if (!cursorRef.current) return
    quickX.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.15,
      ease: "power3",
    })
    quickY.current = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.15,
      ease: "power3",
    })

    const updateCursor = () => {
      if (
        !sliderRef.current ||
        !quickX.current ||
        !quickY.current ||
        !isHovered.current
      )
        return
      const rect = sliderRef.current.getBoundingClientRect()
      const x = lastMouse.current.x - rect.left
      const y = lastMouse.current.y - rect.top
      quickX.current(x)
      quickY.current(y)
      setCursorText(x < rect.width / 2 ? "Prev" : "Next")
    }

    const onScroll = () => {
      if (isHovered.current) {
        updateCursor()
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current || !quickX.current || !quickY.current) return
    lastMouse.current = { x: e.clientX, y: e.clientY }
    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    quickX.current(x)
    quickY.current(y)

    setCursorText(x < rect.width / 2 ? "Prev" : "Next")
  }

  const handleMouseEnter = () => {
    isHovered.current = true
    gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3 })
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    gsap.to(cursorRef.current, { opacity: 0, scale: 0.8, duration: 0.3 })
  }

  // (Custom wipe logic removed in favor of Swiper EffectCreative)

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-white text-ink py-[120px]"
    >
      <div className="mx-auto max-w-[1840px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-5">
          {/* ── Left Column: Text & Table ── */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-16">
              <span
                ref={dotRef}
                className="inline-block w-[7px] h-[7px] bg-ink"
              />
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
            <div
              ref={tableRef}
              className="mt-16 w-full max-w-[445px] h-[185px] flex flex-col justify-between"
            >
              {COLLABS.map((collab, i) => (
                <div
                  key={collab.company}
                  ref={(el) => {
                    tableRowsRef.current[i] = el
                  }}
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
              >
                {/* Custom Swiper with Parallax Reveal Wipe */}
                <Swiper
                  modules={[Navigation, EffectCreative]}
                  loop
                  speed={600}
                  effect="creative"
                  creativeEffect={{
                    prev: {
                      shadow: false,
                      // The outgoing image moves slower (-30%) to create 3D depth
                      translate: ["-30%", 0, -1],
                    },
                    next: {
                      // The incoming image moves at 100% speed, acting as a hard vertical wipe
                      translate: ["100%", 0, 0],
                    },
                  }}
                  onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                  navigation={{
                    prevEl: swiperPrevRef.current,
                    nextEl: swiperNextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    if (
                      typeof swiper.params.navigation !== "boolean" &&
                      swiper.params.navigation
                    ) {
                      swiper.params.navigation.prevEl = swiperPrevRef.current
                      swiper.params.navigation.nextEl = swiperNextRef.current
                    }
                  }}
                  className="w-full h-full"
                >
                  {COLLABS.map((collab, i) => (
                    <SwiperSlide
                      key={collab.company}
                      className="w-full h-full overflow-hidden"
                    >
                      <Image
                        src={collab.img}
                        alt={collab.company}
                        fill
                        priority={i < 2}
                        quality={90}
                        unoptimized
                        className="object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Invisible clickable areas for custom navigation */}
                <button
                  ref={swiperPrevRef}
                  className="absolute inset-y-0 left-0 w-1/2 z-20 outline-none"
                  aria-label="Previous image"
                />
                <button
                  ref={swiperNextRef}
                  className="absolute inset-y-0 right-0 w-1/2 z-20 outline-none"
                  aria-label="Next image"
                />

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
                <div className="text-[16px] leading-[24px] overflow-hidden">
                  <div ref={counterRef}>
                    {currentIndex + 1}/{COLLABS.length}
                  </div>
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
