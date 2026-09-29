import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { directoryLetters } from "@/lib/location-directory";

export const metadata: Metadata = {
  title: "Cities We Serve | ClickMasters",
  description:
    "Browse application development locations by city. ClickMasters builds software for businesses across the USA and worldwide.",
  alternates: {
    canonical: canonicalUrl("/locations/directory"),
  },
};

export default function LocationDirectoryPage() {
  const letters = directoryLetters();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto w-[85vw] px-6 pb-24 pt-32">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
          — Locations
        </p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] max-w-3xl">
          Find a city
        </h1>
        <h2 className="mt-8 text-2xl md:text-3xl font-medium text-white/80">
          Browse by letter
        </h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {letters.map((letter) => (
            <li key={letter}>
              <Link
                href={`/locations/directory/${letter.toLowerCase()}`}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-sm text-white/80 hover:bg-white hover:text-[#050505]"
              >
                {letter}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
