"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

function VideoPlayer({ src, client, project }: { src: string, client: string, project: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const quickX = useRef<any>(null)
  const quickY = useRef<any>(null)
  
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!cursorRef.current) return
    quickX.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" })
    quickY.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" })
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !quickX.current) return
    const rect = containerRef.current.getBoundingClientRect()
    quickX.current(e.clientX - rect.left)
    quickY.current(e.clientY - rect.top)
  }

  const handleMouseEnter = () => {
    gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3 })
  }

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, { opacity: 0, scale: 0.8, duration: 0.3 })
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <div className="mt-20 lg:mt-32 first:mt-0 lg:first:mt-0">
      <div className="flex justify-between items-center text-[14px] leading-[22px] mb-4">
        <span>{client}</span>
        <span>{project}</span>
      </div>
      <div 
        ref={containerRef}
        className="relative w-full max-w-[936px] cursor-none overflow-hidden"
        style={{ aspectRatio: "936 / 526" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={togglePlay}
      >
        <video 
          ref={videoRef}
          src={src} 
          className="w-full h-full object-cover"
          playsInline
          loop
        />
        {/* Dark overlay when paused to make "Play" readable, completely optional but good for UX */}
        <div 
          className={`absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} 
        />
        <div
          ref={cursorRef}
          className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2 text-white text-[24px] tracking-tight uppercase"
          style={{ opacity: 0, scale: 0.8, top: 0, left: 0 }}
        >
          {isPlaying ? "Pause" : "Play"}
        </div>
      </div>
    </div>
  )
}

export default function ClientStories() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const videosRef = useRef<HTMLDivElement>(null)

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

      /* ── Divider ── */
      gsap.from(dividerRef.current, {
        scaleX: 0,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: { trigger: dividerRef.current, start: "top 85%", once: true },
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

      /* ── Videos Container ── */
      gsap.from(videosRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: videosRef.current,
          start: "top 85%",
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 bg-white text-ink py-[120px]">
      <div className="mx-auto max-w-[1840px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-5">
          
          {/* ── Left Column: Text ── */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-6">
              <span ref={dotRef} className="inline-block w-[7px] h-[7px] bg-ink" />
              <span ref={labelRef} className="text-[14px] leading-[22px]">
                Client stories
              </span>
            </div>
            
            <div ref={dividerRef} className="h-px w-full bg-ink/15 origin-left mb-6" />

            <p ref={paraRef} className="text-[17px] leading-[28px]">
              Take a look at the people behind the projects. Each story reflects a shared process grounded in trust, clear communication, and respect for detail—collaborations shaped over time. From the first conversation to completion, our clients are active participants. These stories go beyond finished homes, reflecting relationships built with care, projects delivered with integrity, and experiences defined by clarity and quiet satisfaction.
            </p>
          </div>

          {/* ── Right Column: Videos ── */}
          <div ref={videosRef} className="col-span-12 lg:col-span-8 lg:col-start-5 mt-20 lg:mt-0 flex flex-col lg:items-end">
            <div className="w-full max-w-[936px]">
              <VideoPlayer 
                src="/videos/client1.mp4" 
                client="Anna & Jeremy" 
                project="Project Pinnacle" 
              />
              <VideoPlayer 
                src="/videos/client2.mp4" 
                client="Rob and Cindy" 
                project="Project Calibre" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
