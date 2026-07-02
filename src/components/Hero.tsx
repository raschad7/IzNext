"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import HavenWordmark from "./HavenWordmark"

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero({ loading = false }: { loading?: boolean }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -150])

  return (
    // Sticky/pinned: the hero holds in place while the intro video scrolls up
    // over it, so the statement and EST./MELBOURNE labels never move.
    <section className="sticky top-0 z-0 flex h-screen flex-col bg-white px-6 md:px-12">
      <div className="mx-auto flex w-full max-w-[1840px] flex-1 flex-col">
        {/* Statement, upper-right */}
        <div className="flex justify-end pt-28 md:pt-36">
          <motion.div
            initial="hidden"
            animate={loading ? "hidden" : "visible"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.35, delayChildren: 0.2 },
              },
            }}
            className="flex flex-col max-w-[26rem] text-[14px] leading-[22.1px] tracking-[0] text-ink"
          >
            <div className="flex gap-3">
              <motion.span
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: EASE } },
                }}
                className="mt-[6px] inline-block h-[10px] w-[10px] shrink-0 bg-accent"
              />
              <div className="overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 1.6, ease: EASE } },
                  }}
                  className="block"
                >
                  A Haven home is more than bricks and mortar.
                </motion.span>
              </div>
            </div>
            
            <div className="overflow-hidden">
              <motion.span
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 1.6, ease: EASE } },
                }}
                className="block"
              >
                It&rsquo;s crafted, personal and shaped around you.
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Giant wordmark, pinned to the bottom */}
        <motion.div className="mt-auto" style={{ y }}>
          <motion.div
            initial="hidden"
            animate={loading ? "hidden" : "visible"}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.1, delay: 0.1, ease: EASE } }
            }}
          >
            <HavenWordmark className="w-full text-accent" />
          </motion.div>

          {/* Bottom labels */}
          <motion.div
            initial="hidden"
            animate={loading ? "hidden" : "visible"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.8, delay: 0.6, ease: EASE } }
            }}
            className="flex items-center justify-between pb-6 pt-4 text-xs uppercase tracking-[0.08em] text-ink md:text-sm"
          >
            <span>EST. 1990</span>
            <span>Melbourne</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
    
  )
}
