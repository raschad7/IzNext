import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroVideo from "@/components/IntroVideo";
import ScrollGallery from "@/components/ScrollGallery";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <IntroVideo />
        <ScrollGallery />
        {/* Next sections (guiding values, featured projects…) build below */}
      </main>
    </>
  );
}
