import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroVideo from "@/components/IntroVideo";
import ScrollGallery from "@/components/ScrollGallery";
import GuidingValues from "@/components/GuidingValues";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <IntroVideo />
        <ScrollGallery />
        <GuidingValues />
        <FeaturedProjects />
        {/* Next sections build below */}
      </main>
    </>
  );
}

