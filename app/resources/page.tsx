import { Metadata } from "next";
import SpiralGallery from "@/components/landingPage/SpiralGallery";

export const metadata: Metadata = {
  title: "Resources | ClickMasters",
  description:
    "Explore ClickMasters' collection of resources, guides, insights, case studies, and digital marketing content to help grow your business online.",
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesPage() {
  return <SpiralGallery />;
}
