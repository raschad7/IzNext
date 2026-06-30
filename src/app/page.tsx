import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/* Next sections (gallery, guiding values, featured projects…) build below */}
      </main>
    </>
  );
}
