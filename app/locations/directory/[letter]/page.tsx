import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { canonicalUrl } from "@/lib/site";
import { cityLinks, directoryLetters } from "@/lib/location-directory";

export function generateStaticParams() {
  return directoryLetters().map((letter) => ({
    letter: letter.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ letter: string }>;
}): Promise<Metadata> {
  const { letter } = await params;
  const label = letter.toUpperCase();

  return {
    title: `Software Development Cities — ${label} | ClickMasters`,
    description: `Application development for cities starting with ${label}.`,
    alternates: {
      canonical: canonicalUrl(`/locations/directory/${letter.toLowerCase()}`),
    },
  };
}

export default async function LocationLetterPage({
  params,
}: {
  params: Promise<{ letter: string }>;
}) {
  const { letter } = await params;
  const label = letter.toUpperCase();
  const allowed = directoryLetters();
  if (!allowed.includes(label)) notFound();

  const cities = cityLinks().filter((city) => city.letter === label);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto w-[85vw] px-6 pb-24 pt-32">
        <Link
          href="/locations/directory"
          className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white"
        >
          All letters
        </Link>
        <h1 className="mt-6 text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02]">
          Cities starting with {label}
        </h1>
        <h2 className="mt-4 text-white/50 text-lg">
          {cities.length} locations
        </h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <li key={city.href}>
              <Link
                href={city.href}
                className="block rounded-xl border border-white/10 px-4 py-3 text-sm text-white/75 hover:border-white/30 hover:text-white"
              >
                {city.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
