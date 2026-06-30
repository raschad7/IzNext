"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Expertise", href: "/expertise" },
  { label: "For Architects", href: "/for-architects" },
  { label: "Contact", href: "/contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Small brand mark, top-left. Placeholder for the real monogram. */
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-label="Haven" role="img">
      <path d="M2 2h16v9l-9 9H2V2Z" fill="currentColor" />
      <path d="M22 38h16v-9l-9-9h-7v18Z" fill="currentColor" />
      <path d="M2 24h13l-2 2H2v-2Z" fill="currentColor" opacity="0.55" />
      <path d="M38 16H25l2-2h11v2Z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Logo + "Let's Talk" hide once past the hero; only the pill stays.
  const sideHidden = scrolled
    ? "pointer-events-none -translate-y-2 opacity-0"
    : "translate-y-0 opacity-100";

  // 420 default, 320 when scrolled, always 420 while open.
  const pillWidth = open ? 420 : scrolled ? 320 : 420;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto grid max-w-[1840px] grid-cols-2 items-start px-6 pt-6 md:grid-cols-3 md:px-12 md:pt-7">
        {/* Logo */}
        <Link
          href="/"
          className={`flex h-16 items-center justify-self-start text-accent transition-all duration-500 ease-out ${sideHidden}`}
        >
          <LogoMark className="h-9 w-9 md:h-11 md:w-11" />
        </Link>

        {/* Center pill / expanding menu panel */}
        <div className="col-span-2 row-start-1 justify-self-center md:col-span-1 md:col-start-2">
          <motion.div
            animate={{ width: pillWidth }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ maxWidth: "88vw" }}
            className={`group overflow-hidden rounded-[14px] transition-[background-color,transform] duration-[400ms] ease-out ${
              open
                ? "bg-[#1E499D]"
                : "bg-[#EFF0F3] hover:scale-x-[1.03] hover:bg-[#1E499D]"
            }`}
          >
            {/* Header row (the pill itself) */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-16 w-full items-center justify-between px-[30px]"
            >
              <span
                className={`text-[16px] transition-colors duration-300 ${
                  open ? "text-white" : "text-ink group-hover:text-white"
                }`}
              >
                Menu
              </span>

              {/* Two lines that morph into an X */}
              <span className="relative block h-4 w-8">
                <span
                  style={{
                    transform: open
                      ? "translateY(-50%) rotate(45deg)"
                      : "translateY(calc(-50% - 3px))",
                  }}
                  className={`absolute left-0 top-1/2 h-[1.5px] w-8 origin-center transition-all duration-300 ${
                    open ? "bg-white" : "bg-ink group-hover:bg-white"
                  }`}
                />
                <span
                  style={{
                    transform: open
                      ? "translateY(-50%) rotate(-45deg)"
                      : "translateY(calc(-50% + 3px))",
                  }}
                  className={`absolute left-0 top-1/2 h-[1.5px] w-8 origin-center transition-all duration-300 ${
                    open ? "bg-white" : "bg-ink group-hover:bg-white"
                  }`}
                />
              </span>
            </button>

            {/* Expanding content */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <ul className="px-[30px]">
                    {NAV_LINKS.map((link, i) => (
                      <li key={link.href}>
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
                      </li>
                    ))}
                  </ul>

                  {/* Contact info */}
                  <div className="space-y-3 px-[30px] pb-9 pt-5 text-[14px] leading-[22px] text-white/90">
                    <a
                      href="tel:0483987479"
                      className="flex w-fit items-center gap-1.5 transition-colors hover:text-white"
                    >
                      0483 987 479 <ArrowUpRight size={14} strokeWidth={1.5} />
                    </a>
                    <a
                      href="mailto:info@havenconstructions.com.au"
                      className="flex w-fit items-center gap-1.5 transition-colors hover:text-white"
                    >
                      info@havenconstructions.com.au{" "}
                      <ArrowUpRight size={14} strokeWidth={1.5} />
                    </a>
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
  );
}
