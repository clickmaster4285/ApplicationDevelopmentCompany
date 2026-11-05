export function limitSeoText(value: string, maxLength: number): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) {
    return text;
  }

  const brandSeparator = text.lastIndexOf(" | ");
  const brand = text.slice(brandSeparator);
  const preserveBrand =
    brandSeparator > 0 &&
    brand.toLowerCase().includes("clickmasters") &&
    brand.length < maxLength / 2;
  const availableLength = preserveBrand
    ? maxLength - brand.length - 1
    : maxLength - 1;
  const truncated = text.slice(0, availableLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const body =
    lastSpace > availableLength * 0.6
      ? truncated.slice(0, lastSpace)
      : truncated;

  return `${body.trimEnd()}…${preserveBrand ? brand : ""}`;
}
