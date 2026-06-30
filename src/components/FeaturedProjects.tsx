"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

/*
  "Featured Projects" section — same text animation pattern as GuidingValues.
  Layout: 12-col grid, heading top-left, divider, label left, body copy right
  with "See all projects" link. Below: centered project card image (690×816).
*/
export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const para1Ref = useRef<HTMLParagraphElement>(null)
  const para2Ref = useRef<HTMLParagraphElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
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

      /* ── Label ── */
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

      /* ── "See all projects" link ── */
      gsap.from(linkRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: linkRef.current,
          start: "top 90%",
          once: true,
        },
      })

      /* ── Image subtle parallax (matches GuidingValues) ── */
      gsap.fromTo(
        imageInnerRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
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
              Featured Projects
            </h2>
          </div>

          {/* ── Divider ── */}
          <div className="col-span-12 mt-10 mb-10">
            <div
              ref={dividerRef}
              className="h-px w-full bg-ink/15 origin-left"
            />
          </div>

          {/* ── Label (left) ── */}
          <div className="col-span-12 lg:col-span-3">
            <div className="flex items-center gap-2.5">
              <span
                ref={dotRef}
                className="inline-block w-[7px] h-[7px] bg-ink"
              />
              <span ref={labelRef} className="text-[14px] leading-[22px]">
                Go beyond bricks and mortar
              </span>
            </div>
          </div>

          {/* ── Body copy + link (right) ── */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-6 mt-10 lg:mt-0">
            <p ref={para1Ref} className="text-[17px] leading-[28px]">
              Our projects are the result of trust, close collaboration, and an
              uncompromising approach to quality. We undertake a limited number
              of projects at any one time, ensuring each home receives the time,
              focus, and care it deserves.
            </p>

            <p ref={para2Ref} className="text-[18px] leading-[28px] mt-8">
              As a family-owned builder with over 35 years of experience in
              Melbourne, we bring continuity, accountability, and proven
              capability to every project. The result is a portfolio of homes
              that are thoughtfully crafted. Projects defined by precision, care,
              and quiet excellence.
            </p>

            <div className="mt-8 overflow-hidden">
              <Link
                ref={linkRef}
                href="/projects"
                className="group inline-flex items-center text-[17px] leading-[28px] text-ink"
              >
                <span className="relative">
                  See all projects
                  <span className="absolute bottom-0 left-0 h-px w-full bg-ink/30 transition-colors duration-300 group-hover:bg-ink" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Centered project image ── */}
        <div className="mt-24 flex justify-center">
          <div
            ref={imageRef}
            className="relative w-full max-w-[690px] overflow-hidden"
            style={{ aspectRatio: "690 / 816" }}
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
                src="/images/feature1.jpeg"
                alt="Featured project"
                width={690}
                height={816}
                quality={90}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
