import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | ClickMasters",
  description:
    "Stories, frameworks, and lessons from the ClickMasters application development team.",
  alternates: {
    canonical: canonicalUrl("/blog"),
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
