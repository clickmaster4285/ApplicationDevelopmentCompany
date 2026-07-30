import { Metadata } from "next";
import { About } from "@/components/landingPage/AboutUs";

export const metadata: Metadata = {
  title: "About Us | ClickMasters",
  description:
    "Learn more about ClickMasters, our team, and how we help businesses grow through digital marketing, SEO, web design, and AI-powered solutions.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
