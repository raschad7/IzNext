"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

const AWARDS = [
  {
    org: "Melbourne Design Awards",
    award: "Gold – Custom Home ($3–$5m)",
    year: "'25",
  },
  {
    org: "National Architecture Awards",
    award: "Residential Boutique Custom Builder of the Year",
    year: "'24",
  },
  {
    org: "HIA Victoria",
    award: "Winner – Renovated Kitchen",
    year: "'23",
  },
  {
    org: "HIA Victoria",
    award: "Winner – Custom Home Under $3m",
    year: "'20",
  },
]

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      /* ── Dot (scale in) ── */
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

      /* ── Label ── */
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

      /* ── Table Rows ── */
      gsap.from(rowsRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: rowsRef.current[0],
          start: "top 85%",
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-white text-ink py-[120px]"
    >
      <div className="mx-auto max-w-[1840px] px-6 md:px-12">
        {/* Label */}
        <div className="flex items-center gap-2.5 mb-8">
          <span ref={dotRef} className="inline-block w-[7px] h-[7px] bg-ink" />
          <span ref={labelRef} className="text-[14px] leading-[22px]">
            Awards
          </span>
        </div>

        {/* Awards List */}
        <div className="w-full flex flex-col ">
          {AWARDS.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                rowsRef.current[i] = el
              }}
              className="flex flex-col md:flex-row md:items-center py-4 border-b border-ink/15 text-[17px] leading-[32px] md:leading-none"
            >
              <div className="w-full md:w-[45%] mb-2 md:mb-0">{item.org}</div>
              <div className="w-full md:w-[45%] mb-2 md:mb-0">{item.award}</div>
              <div className="w-full md:w-[10%] md:text-right">{item.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
