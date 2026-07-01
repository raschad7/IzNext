"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectCardProps {
  href: string
  imageSrc?: string
  videoSrc?: string
  alt: string
  width: number
  height: number
  title: string
  year: string
  className?: string
}

export default function ProjectCard({
  href,
  imageSrc,
  videoSrc,
  alt,
  width,
  height,
  title,
  year,
  className = "",
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const hoverLeftRef = useRef<HTMLDivElement>(null)
  const hoverRightRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const mediaInnerRef = useRef<HTMLDivElement>(null)
  const quickY = useRef<{ arrow: any; left: any; right: any } | null>(null)

  useEffect(() => {
    if (!mediaRef.current || !mediaInnerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaInnerRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: mediaRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  /* ── Hover cursor interaction ── */
  useEffect(() => {
    if (!arrowRef.current || !hoverLeftRef.current || !hoverRightRef.current) return
    quickY.current = {
      arrow: gsap.quickTo(arrowRef.current, "y", { duration: 0.25, ease: "power3" }),
      left: gsap.quickTo(hoverLeftRef.current, "y", { duration: 0.3, ease: "power3" }),
      right: gsap.quickTo(hoverRightRef.current, "y", { duration: 0.3, ease: "power3" }),
    }
    const qx = gsap.quickTo(arrowRef.current, "x", { duration: 0.25, ease: "power3" })
    ;(quickY.current as any).arrowX = qx
  }, [])

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 })
    gsap.to(arrowRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" })
    gsap.fromTo(
      hoverLeftRef.current,
      { xPercent: -120, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
    )
    gsap.fromTo(
      hoverRightRef.current,
      { xPercent: 120, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
    )
  }

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.35 })
    gsap.to(arrowRef.current, { opacity: 0, scale: 0.6, duration: 0.3 })
    gsap.to(hoverLeftRef.current, { xPercent: -120, opacity: 0, duration: 0.4, ease: "power3.in" })
    gsap.to(hoverRightRef.current, { xPercent: 120, opacity: 0, duration: 0.4, ease: "power3.in" })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !quickY.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    quickY.current.arrow(y)
    ;(quickY.current as any).arrowX(x)
    quickY.current.left(y)
    quickY.current.right(y)
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      className={`relative block w-full overflow-hidden cursor-none ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Parallax media container */}
      <div ref={mediaRef} className="absolute inset-0 overflow-hidden">
        <div
          ref={mediaInnerRef}
          style={{
            position: "absolute",
            height: "110%",
            width: "100%",
            top: "-10%",
          }}
        >
          {videoSrc ? (
            <video
              src={videoSrc}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={imageSrc!}
              alt={alt}
              width={width}
              height={height}
              quality={90}
              unoptimized
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-black/30 pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Custom arrow cursor */}
      <div
        ref={arrowRef}
        className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0, scale: 0.6, top: 0, left: 0 }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 16 16"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4,4L10.586,4L0.979,13.607L2.393,15.021L12,5.414L12,12L14,12L14,2L4,2L4,4Z" />
        </svg>
      </div>

      {/* Left label — slides in from left */}
      <div
        ref={hoverLeftRef}
        className="pointer-events-none absolute left-7 z-20 -translate-y-1/2 text-[18px] text-white"
        style={{ opacity: 0, top: 0 }}
      >
        {title}
      </div>

      {/* Right label — slides in from right */}
      <div
        ref={hoverRightRef}
        className="pointer-events-none absolute right-7 z-20 -translate-y-1/2 text-[18px] text-white"
        style={{ opacity: 0, top: 0 }}
      >
        {year}
      </div>
    </Link>
  )
}
