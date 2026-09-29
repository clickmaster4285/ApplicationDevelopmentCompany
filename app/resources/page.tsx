import { Metadata } from "next";
import SpiralGallery from "@/components/landingPage/SpiralGallery";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources | ClickMasters",
  description:
    "Explore ClickMasters' collection of resources, guides, insights, case studies, and digital marketing content to help grow your business online.",
  alternates: {
    canonical: canonicalUrl("/resources"),
  },
};

export default function ResourcesPage() {
  return <SpiralGallery />;
}
