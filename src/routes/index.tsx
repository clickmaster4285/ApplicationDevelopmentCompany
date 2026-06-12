import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Tunnel } from "@/components/site/Tunnel";
import { Projects } from "@/components/site/Projects";
import { WhyUs } from "@/components/site/WhyUs";
import { Stack } from "@/components/site/Stack";
import { Stats } from "@/components/site/Stats";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { About } from "@/components/site/AboutUs";
import SpiralGallery from "@/components/site/SpiralGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClickMasters — Premium Application Development Studio" },
      {
        name: "description",
        content:
          "ClickMasters engineers category-defining mobile, web and SaaS products for ambitious teams. Cinematic detail. Engineering rigor.",
      },
      { property: "og:title", content: "ClickMasters — Premium Application Development Studio" },
      {
        property: "og:description",
        content:
          "Cinematic, sophisticated software craft. Mobile, web, SaaS and enterprise systems engineered end-to-end.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-[#050505] text-white antialiased">
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />

      <Marquee />
      <About />
      <Services />
<SpiralGallery/>

      <Stack />
      
      {/* <Tunnel /> */}
      <Projects />
      <Stats />
      <WhyUs />
     
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
