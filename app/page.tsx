import { Metadata } from "next";

import { Nav } from "@/components/landingPage/Nav";
import { Hero } from "@/components/landingPage/Hero";
import { Marquee } from "@/components/landingPage/Marquee";
import { Services } from "@/components/landingPage/Services";
// import { Tunnel } from "@/components/landingPage/Tunnel";
import { Projects } from "@/components/landingPage/Projects";
import { WhyUs } from "@/components/landingPage/WhyUs";
import { Stack } from "@/components/landingPage/Stack";
import { Stats } from "@/components/landingPage/Stats";
import { FAQ } from "@/components/landingPage/FAQ";
import { CTA } from "@/components/landingPage/CTA";
import { Footer } from "@/components/landingPage/Footer";
import { Cursor } from "@/components/landingPage/Cursor";
import { SmoothScroll } from "@/components/landingPage/SmoothScroll";
import { About } from "@/components/landingPage/AboutUs";
import SpiralGallery from "@/components/landingPage/SpiralGallery";
import { ShuffleCards } from "@/components/landingPage/Testimonial";

export const metadata: Metadata = {
  title: "Application development company USA - Clickmasters",
  description:
    "ClickMasters is a leading application development company USA providing app development services that build digital products, improve systems, and drive digital growth.",

  openGraph: {
    title: "Application development company USA - Clickmasters",
    description:
      "ClickMasters is a leading application development company USA providing app development services that build digital products, improve systems, and drive digital growth.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Application development company USA - Clickmasters",
    description:
      "ClickMasters is a leading application development company USA providing app development services that build digital products, improve systems, and drive digital growth.",
  },
};

export default function HomePage() {
  return (
    <main className="relative bg-[#050505] text-white antialiased">
      <SmoothScroll />
      <Cursor />

      
      <Hero />

      <Marquee />
      <About />
      <Services />

      <SpiralGallery />

      <Stack />

      {/* <Tunnel /> */}

      <Projects />
      <Stats />
      <WhyUs />

      <ShuffleCards />

      <FAQ />
      <CTA />
   
    </main>
  );
}
