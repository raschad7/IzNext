"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatedLogo } from "./AnimatedLogo"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-label="Haven"
      role="img"
    >
      <path d="M2 2h16v9l-9 9H2V2Z" fill="currentColor" />
      <path d="M22 38h16v-9l-9-9h-7v18Z" fill="currentColor" />
      <path d="M2 24h13l-2 2H2v-2Z" fill="currentColor" opacity="0.55" />
      <path d="M38 16H25l2-2h11v2Z" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

function SocialLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="group relative flex items-center w-fit justify-end overflow-visible"
    >
      {/* Left arrow (appears from below, sits where the text starts before shifting) */}
      <span className="absolute left-0 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </span>

      {/* Text and right arrow wrapper that shifts right to make room for the left arrow */}
      <div className="flex items-center transition-transform duration-300 group-hover:translate-x-5">
        <span>{children}</span>

        {/* Right arrow (disappears upwards) */}
        <span className="ml-1.5 translate-y-0 opacity-100 transition-all duration-300 group-hover:-translate-y-3 group-hover:opacity-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(SVGPathElement | null)[]>([])

  const cursorRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLAnchorElement>(null)
  const quickX = useRef<any>(null)
  const quickY = useRef<any>(null)

  // Cursor logic
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
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageContainerRef.current || !quickX.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    quickX.current(e.clientX - rect.left)
    quickY.current(e.clientY - rect.top)
  }

  const handleMouseEnter = () => {
    gsap.fromTo(
      cursorRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.5)" },
    )
  }

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    })
  }

  // Footer animations
  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      // Parallax reveal: translate the inner content, never the footer itself.
      // The footer stays static in the flow so ScrollTrigger positions are
      // stable and no gap opens up below the page.
      gsap.fromTo(
        contentRef.current,
        { yPercent: -40 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      )

      // Darken overlay as the footer is covered
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.6 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      )

      // Letter-by-letter scrub animation (right to left).
      // lettersRef is ordered H,a,v,e,n, so stagger from the end for
      // right-to-left. Trigger on the static footer (not .haven-big-text,
      // which moves with the parallax and would give stale positions).
      gsap.fromTo(
        lettersRef.current,
        { y: 100 },
        {
          y: 0,
          stagger: { each: 0.2, from: "end" },
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    // z-0 allows the above section (which is z-10) to cover the footer during the parallax
    <footer
      ref={footerRef}
      className="relative z-0 bg-[#123c8a] text-white pt-20 pb-6 px-6 md:px-12 overflow-hidden"
    >
      {/* Dark overlay that fades in as we scroll up */}
      <div ref={overlayRef} className="absolute inset-0 bg-black pointer-events-none z-0" />

      <div ref={contentRef} className="mx-auto max-w-[1840px] relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between pb-24">
          {/* Left: Logo & Links */}
          <div>
            <AnimatedLogo className="mb-12 h-[36px] w-[36px]" color="white" />
            <nav className="flex flex-col gap-3 font-medium text-[15px]">
              {["About", "Projects", "Expertise", "For Architects", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="group relative w-fit"
                >
                  {link}
                  {/* Underline expanding from left to right on hover */}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Socials & Recent */}
          <div className="flex flex-col md:items-end mt-12 md:mt-0">
            <div className="flex flex-col md:items-end gap-2 font-medium text-[15px] mb-12 text-right">
              <SocialLink href="#">Instagram</SocialLink>
              <SocialLink href="#">Facebook</SocialLink>
            </div>

            {/* Recently Completed */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-1.5 h-1.5 bg-white" />
                <span className="text-[13px] font-medium">Recently completed</span>
              </div>
              
              <Link 
                href="/projects/calibre" 
                ref={imageContainerRef}
                className="relative block cursor-none overflow-hidden group"
                style={{ width: "362px", height: "202px" }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src="/images/feature1.jpeg"
                  alt="Recently completed project"
                  fill
                  quality={90}
                  unoptimized
                  className="object-cover"
                />
                
                {/* Fixed position text inside image */}
                <div className="absolute inset-0 p-4 flex items-center justify-between z-10 text-white font-medium text-[14px]">
                  <span>Calibre</span>
                  <span>2025</span>
                </div>
                
                {/* Dark gradient overlay for text readability + Hover darkening */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-colors duration-300 group-hover:bg-black/30" />

                {/* Custom arrow cursor */}
                <div
                  ref={cursorRef}
                  className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ opacity: 0, scale: 0 }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 16 16"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4,4L10.586,4L0.979,13.607L2.393,15.021L12,5.414L12,12L14,12L14,2L4,2L4,4Z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Big Text SVG */}
        <div className="haven-big-text w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1414 419"
            fill="none"
            className="w-full h-auto text-white"
          >
            <path
              ref={(el) => {
                lettersRef.current[4] = el
              }}
              d="M1161.38 411.642V118.417H1226.79V156.762C1242.01 133.642 1271.9 111.65 1313.63 111.65C1375.09 111.65 1414 156.198 1414 220.482V411.642H1348.59V233.452C1348.59 193.415 1329.98 166.348 1290.51 166.348C1257.8 166.348 1226.79 190.596 1226.79 237.399V411.642H1161.38Z"
              fill="currentColor"
            />
            <path
              ref={(el) => {
                lettersRef.current[3] = el
              }}
              d="M1135.13 318.6C1126.11 377.245 1078.18 418.409 1008.82 418.409C926.495 418.409 868.979 355.817 868.979 265.594C868.979 177.626 928.751 111.65 1008.82 111.65C1092.84 111.65 1139.65 176.498 1139.65 258.263C1139.65 267.285 1139.08 273.488 1137.39 282.51H931.007C936.645 339.464 969.915 365.967 1008.82 365.967C1046.04 365.967 1068.6 347.358 1076.49 318.6H1135.13ZM1008.26 164.093C964.276 164.093 940.593 194.543 933.262 234.579H1076.49C1075.93 197.362 1051.68 164.093 1008.26 164.093Z"
              fill="currentColor"
            />
            <path
              ref={(el) => {
                lettersRef.current[2] = el
              }}
              d="M783.267 411.635H716.164L609.589 118.41H677.819L750.561 336.637L822.739 118.41H888.714L783.267 411.635Z"
              fill="currentColor"
            />
            <path
              ref={(el) => {
                lettersRef.current[1] = el
              }}
              d="M523.025 228.94C542.198 226.121 552.348 217.099 552.348 200.182C552.348 178.19 533.176 161.837 499.342 161.837C463.817 161.837 442.953 179.318 439.57 207.512H374.723C380.362 155.07 424.345 111.65 499.906 111.65C579.414 111.65 615.503 152.251 615.503 218.226V351.869C615.503 371.606 616.631 390.778 618.887 411.642H557.423C555.167 400.364 554.039 387.959 553.476 375.553C537.123 400.928 502.725 418.409 464.381 418.409C409.12 418.409 361.753 385.703 361.753 329.877C361.753 270.669 406.3 246.985 464.945 237.963L523.025 228.94ZM423.217 327.058C423.217 355.253 444.645 369.35 473.967 369.35C515.695 369.35 552.348 344.539 552.348 295.48V270.105L480.17 281.947C448.028 287.585 423.217 297.172 423.217 327.058Z"
              fill="currentColor"
            />
            <path
              ref={(el) => {
                lettersRef.current[0] = el
              }}
              d="M272.358 0H340.025V411.643H272.358V231.197H67.6667V411.643H0V0H67.6667V170.86H272.358V0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center text-[12px] font-medium pt-8 opacity-60">
          <span>©13–25</span>
          <span>
            Web design Melbourne <span className="font-bold">jtb_</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
