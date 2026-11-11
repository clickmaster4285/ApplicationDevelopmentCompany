import { Metadata } from "next";
import { About } from "@/components/landingPage/AboutUs";
import { canonicalUrl } from "@/lib/site";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = {
  title: "About Us | ClickMasters",
  description:
    "Learn more about ClickMasters, our team, and how we help businesses grow through digital marketing, SEO, web design, and AI-powered solutions.",
  alternates: {
    canonical: canonicalUrl("/about"),
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/about", baseMetadata);
}

export default function AboutPage() {
  return <About headingLevel="h1" />;
}
