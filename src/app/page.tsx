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
        <Collaborators />
        <Testimonial />
        <ClientStories />
        <Awards />
        {/* Next sections build below */}
      </main>
    </>
  );
}

