import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies | ClickMasters",
  description:
    "Case studies from ClickMasters application development projects across industries.",
  alternates: {
    canonical: canonicalUrl("/case-studies"),
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
