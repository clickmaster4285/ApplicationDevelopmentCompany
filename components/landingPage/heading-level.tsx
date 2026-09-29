"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";

type Claim = () => "h2" | "h3";

const HeadingClaimContext = createContext<Claim | null>(null);

/**
 * First heading inside this scope renders as h2. Later ones render as h3.
 * Pages outside the scope keep a single h2.
 */
export function SingleH2Scope({ children }: { children: ReactNode }) {
  const used = useRef(false);
  const claim = useRef<Claim>(() => {
    if (used.current) return "h3";
    used.current = true;
    return "h2";
  });

  return (
    <HeadingClaimContext.Provider value={claim.current}>
      {children}
    </HeadingClaimContext.Provider>
  );
}

export function ScopedHeading({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const claim = useContext(HeadingClaimContext);
  const tagRef = useRef<"h2" | "h3" | null>(null);
  if (tagRef.current === null) {
    tagRef.current = claim ? claim() : "h2";
  }
  const Tag = tagRef.current;
  return <Tag className={className}>{children}</Tag>;
}
