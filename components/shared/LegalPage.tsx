import type { ReactNode } from "react";

export const LEGAL_CONTACT_EMAIL = "sales@clickmastersapplicationdevelopment.com";
export const LEGAL_LAST_UPDATED = "November 6, 2026";

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white">
      <article className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-white/40">
          Last updated: {LEGAL_LAST_UPDATED}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-white/60">{intro}</p>
        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-white/65 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-white md:[&_h2]:text-2xl [&_li]:pl-1 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </article>
    </main>
  );
}
