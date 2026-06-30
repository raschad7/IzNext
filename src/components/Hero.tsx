"use client"

import { motion } from "framer-motion"
import HavenWordmark from "./HavenWordmark"

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col bg-white px-6 md:px-12">
      <div className="mx-auto flex w-full max-w-[1840px] flex-1 flex-col">
        {/* Statement, upper-right */}
        <div className="flex justify-end pt-28 md:pt-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="flex max-w-[26rem] gap-3 text-[14px] leading-[22.1px] tracking-[0] text-ink"
          >
            <span className="mt-[6px] inline-block h-[10px] w-[10px] shrink-0 bg-accent" />
            <span>
              A Haven home is more than bricks and mortar.<br></br> It&rsquo;s
              crafted, personal and shaped around you.
            </span>
          </motion.p>
        </div>

        {/* Giant wordmark, pinned to the bottom */}
        <div className="mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          >
            <HavenWordmark className="w-full text-accent" />
          </motion.div>

          {/* Bottom labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="flex items-center justify-between pb-6 pt-4 text-xs uppercase tracking-[0.08em] text-ink md:text-sm"
          >
            <span>EST. 1990</span>
            <span>Melbourne</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
