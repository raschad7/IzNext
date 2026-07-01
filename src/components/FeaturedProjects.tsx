"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import ProjectCard from "./ProjectCard"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

/*
  "Featured Projects" section — same text animation pattern as GuidingValues.
  Layout: 12-col grid, heading top-left, divider, label left, body copy right
  with "See all projects" link. 
  Below: Projects grid (Calibre, Obsidian, Ascot Residence, Small house).
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
              that are thoughtfully crafted. Projects defined by precision,
              care, and quiet excellence.
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

        {/* ── Projects Grid ── */}

        {/* 1. Centered project card: Calibre */}
        <div className="mt-24 flex justify-center">
          <div className="w-full max-w-[690px]">
            <ProjectCard
              href="/projects/calibre"
              imageSrc="/images/feature1.jpeg"
              width={690}
              height={816}
              title="Calibre"
              year="2025"
              alt="Calibre project"
            />
          </div>
        </div>

        {/* 2. Two-column grid below Calibre */}
        <div className="mt-[120px] grid grid-cols-12 gap-x-5 gap-y-16 lg:gap-y-0">
          {/* Left column (Video + Ascot Residence) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-16 lg:gap-[120px]">
            <div className="w-full max-w-[567px]">
              <ProjectCard
                href="/projects/obsidian"
                videoSrc="/videos/feature2.mp4"
                width={567}
                height={794}
                title="Obsidian"
                year="2025"
                alt="Obsidian project"
              />
            </div>

            <div className="w-full max-w-[567px]">
              <ProjectCard
                href="/projects/ascot"
                imageSrc="/images/feature4.jpeg"
                width={567}
                height={794}
                title="Ascot Residence"
                year="2019"
                alt="Ascot Residence project"
              />
            </div>
          </div>

          {/* Right column (Small house) with top padding offset */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 pt-[180px]">
            <div className="w-full max-w-[690px]">
              <ProjectCard
                href="/projects/small-house"
                imageSrc="/images/feature3.jpeg"
                width={690}
                height={1177}
                title="Small house"
                year="2024"
                alt="Small house project"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
