import locationsData from "@/content/locations";

export type CityLink = {
  href: string;
  label: string;
  letter: string;
};

export function cityLinks(): CityLink[] {
  return locationsData.pages
    .map((page) => {
      const slug = page.url.replace(/^\/locations\//, "").replace(/\/$/, "");
      const label = slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      const letter = /^[A-Za-z]/.test(label)
        ? label.charAt(0).toUpperCase()
        : "#";
      const href = page.url.replace(/\/+$/, "");
      return { href, label, letter };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function directoryLetters(): string[] {
  return [...new Set(cityLinks().map((city) => city.letter))].sort();
}
