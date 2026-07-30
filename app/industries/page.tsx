import { Metadata } from "next";
import { WhyUs } from "@/components/landingPage/WhyUs";

export const metadata: Metadata = {
  title: "Industries We Serve | ClickMasters",
  description:
    "Discover the industries ClickMasters serves with tailored digital marketing, SEO, web development, branding, and AI solutions designed to drive business growth.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  return (<div className="mt-30">
  <WhyUs />
  </div>);
}
