import { Metadata } from "next";
import { Services } from "@/components/landingPage/Services";

export const metadata: Metadata = {
  title: "Our Services | ClickMasters",
  description:
    "Discover ClickMasters' comprehensive digital marketing, SEO, web design, web development, branding, PPC, social media marketing, and AI-powered business solutions.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <Services />;
}
