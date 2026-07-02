"use client";

import { motion } from "framer-motion";
import { AnimatedLogo } from "./AnimatedLogo";

export default function LoadingScreen() {
  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0C388D]"
    >
      {/* We use layoutId so the logo flies into the Navbar's logo spot on unmount */}
      <motion.div layoutId="main-logo" transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} className="h-20 w-20 md:h-24 md:w-24">
        <AnimatedLogo
          className="h-full w-full"
          color="white"
          initialFolded={true}
          autoPlayUnfold={true}
          onHoverAnimate={false}
        />
      </motion.div>
    </motion.div>
  );
}
