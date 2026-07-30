import { Metadata } from "next";
import { Projects } from "@/components/landingPage/Projects";

export const metadata: Metadata = {
  title: "Our Portfolio | ClickMasters",
  description:
    "Explore ClickMasters' portfolio of successful web development, SEO, digital marketing, branding, and AI projects delivered for businesses across various industries.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default function Page() {
  return <Projects />;
}
