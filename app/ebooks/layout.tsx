import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ebooks | ClickMasters",
  description:
    "Free guides and playbooks from ClickMasters on application development, security, and delivery.",
  alternates: {
    canonical: canonicalUrl("/ebooks"),
  },
};

export default function EbooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
