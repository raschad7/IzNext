"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroVideo from "@/components/IntroVideo";
import ScrollGallery from "@/components/ScrollGallery";
import GuidingValues from "@/components/GuidingValues";
import FeaturedProjects from "@/components/FeaturedProjects";
import Collaborators from "@/components/Collaborators";
import Testimonial from "@/components/Testimonial";
import ClientStories from "@/components/ClientStories";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force browser to start at top of page on reload instead of remembering previous scroll position
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    // Longer delay for slower unfold animation.
    const timer = setTimeout(() => {
      setLoading(false);
      // Layout can shift once the loading screen unmounts and images load —
      // recompute all scroll-linked animation positions.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      <Navbar loading={loading} />
      <main className="flex-1">
        <Hero loading={loading} />
        <IntroVideo />
        <ScrollGallery />
        <GuidingValues />
        <FeaturedProjects />
        <Collaborators />
        <Testimonial />
        <ClientStories />
        <Awards />
        <Footer />
        {/* Next sections build below */}
      </main>
    </>
  );
}

