import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations | ClickMasters",
  description:
    "Application development for businesses across the USA and worldwide. Browse cities we serve.",
  alternates: {
    canonical: canonicalUrl("/locations"),
  },
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
