"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

/*
  "Our guiding values" section — matches the live Haven site.
  Layout: 12-col grid, heading top-left, divider, Philosophy label left,
  body copy right (col 6–11), image below copy (690×700).
  Animation: GSAP SplitText by line, ScrollTrigger once.
*/
export default function GuidingValues() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const para1Ref = useRef<HTMLParagraphElement>(null)
  const para2Ref = useRef<HTMLParagraphElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      /* ── Heading ── */
      const headingSplit = SplitText.create(headingRef.current!, {
        type: "lines",
        mask: "lines",
      })
      gsap.from(headingSplit.lines, {
        yPercent: 100,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
        },
      })

      /* ── Divider ── */
      gsap.from(dividerRef.current, {
        scaleX: 0,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 85%",
          once: true,
        },
      })

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

      /* ── Philosophy label ── */
      const labelSplit = SplitText.create(labelRef.current!, {
        type: "lines",
        mask: "lines",
      })
      gsap.from(labelSplit.lines, {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 85%",
          once: true,
        },
      })

      /* ── Paragraph 1 ── */
      const p1Split = SplitText.create(para1Ref.current!, {
        type: "lines",
        mask: "lines",
      })
      gsap.from(p1Split.lines, {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: para1Ref.current,
          start: "top 85%",
          once: true,
        },
      })

      /* ── Paragraph 2 ── */
      const p2Split = SplitText.create(para2Ref.current!, {
        type: "lines",
        mask: "lines",
      })
      gsap.from(p2Split.lines, {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: para2Ref.current,
          start: "top 85%",
          once: true,
        },
      })

      /* ── Image fade-in ── */

      /* ── Image subtle parallax (barely noticeable) ── */
      gsap.fromTo(
        imageInnerRef.current,
        { yPercent: -15 }, // Changed from -3 to -15
        {
          yPercent: 15, // Changed from 3 to 15
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 bg-white text-ink">
      <div className="mx-auto max-w-[1840px] px-6 md:px-12 py-[120px]">
        <div className="grid grid-cols-12 gap-x-5">
          {/* ── Heading ── */}
          <div className="col-span-12 lg:col-span-8">
            <h2
              ref={headingRef}
              className="text-[42px] md:text-[48px] lg:text-[48px] leading-[1.08] tracking-[-0.02em]"
            >
              Our guiding values
            </h2>
          </div>

          {/* ── Divider ── */}
          <div className="col-span-12 mt-10 mb-10">
            <div
              ref={dividerRef}
              className="h-px w-full bg-ink/15 origin-left"
            />
          </div>

          {/* ── Philosophy label (left) ── */}
          <div className="col-span-12 lg:col-span-3">
            <div className="flex items-center gap-2.5">
              <span
                ref={dotRef}
                className="inline-block w-[7px] h-[7px] bg-ink"
              />
              <span ref={labelRef} className="text-[14px] leading-[22px]">
                Philosophy
              </span>
            </div>
          </div>

          {/* ── Body copy + image (right) ── */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-6 mt-10 lg:mt-0">
            <p ref={para1Ref} className="text-[17px] leading-[28px]">
              Our homes go beyond construction. They are measured responses to
              how our clients live. Refined, comfortable, and unmistakably
              personal. Through true collaboration, we align precision and
              personality, with craftsmanship with care. Complexity inspires us.
              Each project is a chance to explore, refine and build with intent.
            </p>

            <p ref={para2Ref} className="text-[18px] leading-[28px] mt-8">
              These are homes that speak without words. Like any bespoke object
              made to endure, these homes carry a sense of quiet confidence.
              Expressive without excess, and defined by lasting quality.
            </p>

            {/* Image — 690 × 700 from the handoff */}
            <div
              ref={imageRef}
              className="relative mt-16 w-full overflow-hidden"
              style={{ aspectRatio: "690 / 700" }}
            >
              <div
                ref={imageInnerRef}
                style={{
                  position: "absolute",
                  height: "110%",
                  width: "100%",
                  top: "-10%",
                }}
              >
                <Image
                  src="/images/guildline1.jpeg"
                  alt="Our guiding values"
                  width={690}
                  height={700}
                  quality={90}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
