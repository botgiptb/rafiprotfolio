import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Workflow from "@/components/Workflow";
import Portfolio from "@/components/Portfolio";
import BeforeAfter from "@/components/BeforeAfter";
import Stats from "@/components/Stats";
// import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";

// SEO: page.tsx intentionally uses a fragment — the <main> element is
// declared in layout.tsx to maintain a single landmark per page.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Workflow />
      <Portfolio />
      <BeforeAfter />
      <Stats />
      {/* <Testimonials /> */}
      <About />
      <Contact />
    </>
  );
}