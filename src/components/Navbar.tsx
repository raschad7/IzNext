"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { AnimatedLogo } from "./AnimatedLogo"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Expertise", href: "/expertise" },
  { label: "For Architects", href: "/for-architects" },
  { label: "Contact", href: "/contact" },
]

const EASE = [0.22, 1, 0.36, 1] as const

/* Small brand mark, top-left. Placeholder for the real monogram. */
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

export default function Navbar({ loading = false }: { loading?: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Logo + "Let's Talk" hide once past the hero; only the pill stays.
  const sideHidden = scrolled
    ? "pointer-events-none -translate-y-[150%] opacity-100"
    : "translate-y-0 opacity-100"

  // 420 default, 320 when scrolled, always 420 while open.
  const pillWidth = open ? 420 : scrolled ? 320 : 420

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto grid max-w-[1840px] grid-cols-2 items-start px-6 md:grid-cols-3 md:px-12 transition-all duration-500 ease-out ${scrolled ? "pt-2" : "pt-4 md:pt-5"}`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`flex h-16 items-center justify-self-start transition-all duration-500 ease-out ${sideHidden}`}
        >
          {!loading ? (
            <motion.div layoutId="main-logo" className="h-[36px] w-[36px]">
              <AnimatedLogo className="h-full w-full" color={open ? "white" : "#0C388D"} />
            </motion.div>
          ) : (
            <div className="h-[36px] w-[36px]" />
          )}
        </Link>

        {/* Center pill / expanding menu panel */}
        <div className="col-span-2 row-start-1 justify-self-center md:col-span-1 md:col-start-2">
          <motion.div
            animate={{ width: pillWidth }}
            whileHover={{ width: open ? pillWidth : pillWidth + 24 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ maxWidth: "88vw" }}
            className={`group overflow-hidden rounded-[8px] transition-colors duration-[400ms] ease-out ${
              open ? "bg-[#0D3B96]" : "bg-[#EFF0F3] hover:bg-[#0D3B96]"
            }`}
          >
            {/* Header row (the pill itself) */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-full items-center justify-between px-[29px]"
            >
              <span
                className={`text-[14px]  transition-colors duration-300 ${
                  open ? "text-white" : "text-ink group-hover:text-white"
                }`}
              >
                Menu
              </span>

              {/* Two lines that morph into a perfect X */}
              <span className="relative block h-[12px] w-[60px] shrink-0">
                <span
                  style={{
                    transform: open
                      ? "translateY(5.5px) rotate(15deg)"
                      : "translateY(0px)",
                  }}
                  className={`absolute left-0 top-0 h-[1px] w-full origin-center transition-all duration-300 ${
                    open ? "bg-white" : "bg-ink group-hover:bg-white"
                  }`}
                />
                <span
                  style={{
                    transform: open
                      ? "translateY(-5.5px) rotate(-15deg)"
                      : "translateY(0px)",
                  }}
                  className={`absolute left-0 bottom-0 h-[1px] w-full origin-center transition-all duration-300 ${
                    open ? "bg-white" : "bg-ink group-hover:bg-white"
                  }`}
                />
              </span>
            </button>

            {/* Expanding content */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    closed: { height: 0, opacity: 0 },
                    open: {
                      height: "auto",
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        ease: EASE,
                        staggerChildren: 0.06,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <ul className="px-[29px]">
                    {NAV_LINKS.map((link, i) => (
                      <motion.li
                        key={link.href}
                        variants={{
                          closed: { y: 20, opacity: 0 },
                          open: {
                            y: 0,
                            opacity: 1,
                            transition: { duration: 0.4, ease: EASE },
                          },
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`group/link relative flex items-center py-[28px] ${
                            i > 0 ? "border-t border-white/15" : ""
                          }`}
                        >
                          <span className="absolute left-0 h-2 w-2 -translate-x-1 bg-white opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                          <span className="text-[18px] text-white transition-transform duration-300 group-hover/link:translate-x-7">
                            {link.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Contact info */}
                  <div className="space-y-3 px-[29px] pb-6 pt-3 text-[14px] leading-[22px] text-white/90">
                    <motion.div
                      variants={{
                        closed: { y: 20, opacity: 0 },
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: { duration: 0.4, ease: EASE },
                        },
                      }}
                    >
                      <a
                        href="tel:0483987479"
                        className="group/contact relative flex w-fit items-center overflow-visible transition-colors hover:text-white"
                      >
                        <span className="absolute left-0 translate-y-3 opacity-0 transition-all duration-300 group-hover/contact:translate-y-0 group-hover/contact:opacity-100">
                          <ArrowUpRight size={14} strokeWidth={1.5} />
                        </span>
                        <div className="flex items-center transition-transform duration-300 group-hover/contact:translate-x-[22px]">
                          <span>0483 987 479</span>
                          <span className="ml-1.5 translate-y-0 opacity-100 transition-all duration-300 group-hover/contact:-translate-y-3 group-hover/contact:opacity-0">
                            <ArrowUpRight size={14} strokeWidth={1.5} />
                          </span>
                        </div>
                      </a>
                    </motion.div>

                    <motion.div
                      variants={{
                        closed: { y: 20, opacity: 0 },
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: { duration: 0.4, ease: EASE },
                        },
                      }}
                    >
                      <a
                        href="mailto:info@havenconstructions.com.au"
                        className="group/contact relative flex w-fit items-center overflow-visible transition-colors hover:text-white"
                      >
                        <span className="absolute left-0 translate-y-3 opacity-0 transition-all duration-300 group-hover/contact:translate-y-0 group-hover/contact:opacity-100">
                          <ArrowUpRight size={14} strokeWidth={1.5} />
                        </span>
                        <div className="flex items-center transition-transform duration-300 group-hover/contact:translate-x-[22px]">
                          <span>info@havenconstructions.com.au</span>
                          <span className="ml-1.5 translate-y-0 opacity-100 transition-all duration-300 group-hover/contact:-translate-y-3 group-hover/contact:opacity-0">
                            <ArrowUpRight size={14} strokeWidth={1.5} />
                          </span>
                        </div>
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Let's Talk */}
        <Link
          href="/contact"
          className={`group relative hidden h-16 items-center justify-self-end text-[16px] text-ink transition-all duration-500 ease-out sm:flex ${sideHidden}`}
        >
          Let&rsquo;s Talk
          <span className="absolute bottom-[18px] left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>
    </header>
  )
}
