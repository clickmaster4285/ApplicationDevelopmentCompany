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
import { AudienceSection } from "@/components/landingPage/AudienceSection";
import { IndustrySection } from "@/components/landingPage/IndustrySection";
import { CostTimelineSection } from "@/components/landingPage/CostTimelineSection";
import { SecuritySection } from "@/components/landingPage/SecuritySection";
import { USALocationSection } from "@/components/landingPage/USALocationSection";
import { PostLaunchSection } from "@/components/landingPage/PostLaunchSection";

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

      {/* Process — From Idea to Launch */}
      <SpiralGallery />

      <WhyUs />

      {/* Custom Applications for Startups, Businesses, and Enterprises */}
      <AudienceSection />

      <Stack />

      {/* Application Development for Your Industry */}
      <IndustrySection />

      {/* Our Application Development Work */}
      <Projects />

      {/* Cost & Timeline */}
      <CostTimelineSection />

      <Stats />

      {/* Secure, Scalable, and Integration-Ready Applications */}
      <SecuritySection />

      {/* Application Development Company in USA */}
      <USALocationSection />

      {/* Post-Launch Application Support */}
      <PostLaunchSection />

      {/* <Tunnel /> */}

      <ShuffleCards />

      <FAQ />
      <CTA />
    </main>
  );
}
