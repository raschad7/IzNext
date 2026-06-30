"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Expertise", href: "/expertise" },
  { label: "For Architects", href: "/for-architects" },
  { label: "Contact", href: "/contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Small brand mark, top-left. Placeholder approximation of the real
   square/diagonal Haven monogram — swap with the real SVG when supplied. */
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

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto grid max-w-[1840px] grid-cols-2 items-center px-6 py-6 md:grid-cols-3 md:px-12 md:py-7">
          {/* Logo */}
          <Link href="/" className="justify-self-start text-accent">
            <LogoMark className="h-9 w-9 md:h-11 md:w-11" />
          </Link>

          {/* Center "Menu" pill */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="hidden items-center justify-between rounded-2xl bg-[#efeee9] px-7 py-4 text-ink transition-colors hover:bg-[#e7e6e0] md:flex md:w-[400px] lg:w-[490px]"
          >
            <span className="text-base">Menu</span>
            <span className="flex w-12 flex-col gap-[5px]">
              <span className="h-px w-full bg-ink" />
              <span className="h-px w-full bg-ink" />
              <span className="h-px w-full bg-ink" />
            </span>
          </button>

          {/* Let's Talk */}
          <div className="flex items-center justify-end gap-5 justify-self-end">
            <Link
              href="/contact"
              className="group relative hidden text-base text-ink sm:inline-block"
            >
              Let&rsquo;s Talk
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
            </Link>
            {/* Mobile trigger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex w-7 flex-col gap-[5px] md:hidden"
            >
              <span className="h-px w-full bg-ink" />
              <span className="h-px w-full bg-ink" />
              <span className="h-px w-full bg-ink" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[60] bg-cream"
          >
            <div className="mx-auto flex h-full max-w-[1840px] flex-col px-6 py-6 md:px-12 md:py-7">
              <div className="flex items-center justify-between">
                <span className="text-accent">
                  <LogoMark className="h-9 w-9 md:h-11 md:w-11" />
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-base text-ink hover:text-accent"
                >
                  Close
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center">
                <ul className="space-y-2">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: EASE }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="font-display block text-5xl tracking-tight text-ink transition-colors hover:text-accent md:text-7xl"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
