import { Metadata } from "next";
import { Projects } from "@/components/landingPage/Projects";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Portfolio | ClickMasters",
  description:
    "Explore ClickMasters' portfolio of successful web development, SEO, digital marketing, branding, and AI projects delivered for businesses across various industries.",
  alternates: {
    canonical: canonicalUrl("/solutions"),
  },
};

export default function Page() {
  return <Projects />;
}
