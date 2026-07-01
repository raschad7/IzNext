"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLHeadingElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const authorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      /* ── Quote ── */
      const quoteSplit = SplitText.create(quoteRef.current!, { type: "lines", mask: "lines" })
      gsap.from(quoteSplit.lines, {
        yPercent: 100,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 85%",
          once: true,
        },
      })

      /* ── Dot (scale in) ── */
      gsap.from(dotRef.current, {
        scale: 0,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: { trigger: dotRef.current, start: "top 85%", once: true },
      })

      /* ── Author ── */
      const authorSplit = SplitText.create(authorRef.current!, { type: "lines", mask: "lines" })
      gsap.from(authorSplit.lines, {
        yPercent: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: authorRef.current, start: "top 85%", once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 bg-white text-ink pb-[120px]">
      {/* 
        The container is max 1840px to match the page, but the grid logic
        makes the content mimic the 1474px container with a 936px text block on the right.
      */}
      <div className="mx-auto max-w-[1840px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-5">
          
          {/* Empty left space (takes up 4 columns) */}
          <div className="hidden lg:block lg:col-span-4" />

          {/* Right text block (takes up 8 columns, aligned with the image slider above) */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <div className="w-full max-w-[936px] min-h-[419px] flex flex-col justify-center">
              
              <h2
                ref={quoteRef}
                className="text-[32px] md:text-[55px] leading-[1.05] tracking-[-0.02em] font-medium"
              >
                “ Haven Construction is the most genuine, trustworthy builder, who can construct the most intricate structure with ease, and they work tirelessly to make your dreams come to life, and are equally as excited about their work as you are about your finished home.
              </h2>
              
              <div className="mt-12 flex items-center gap-2.5">
                <span ref={dotRef} className="inline-block w-[7px] h-[7px] bg-ink" />
                <span ref={authorRef} className="text-[14px] leading-[22px]">
                  Michael and Kathryn - Project Calibre
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
