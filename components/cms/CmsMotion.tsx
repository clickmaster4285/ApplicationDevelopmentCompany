"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Client boundary so server-rendered CMS sections can use the site's Reveal motion. */
export function CmsMotion({ children }: { children: ReactNode }) {
  return <Reveal>{children}</Reveal>;
}
