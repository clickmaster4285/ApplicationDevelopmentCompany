type LocationPageContent = {
  content: string;
  metadata: {
    productionNote?: string;
  };
};

export function isLocationPageIndexable(page: LocationPageContent): boolean {
  const content = `${page.content}\n${page.metadata.productionNote ?? ""}`;

  return !/(?:REQUIRED BEFORE INDEXING|LOCAL DATA MODULE|ships noindex until)/i.test(
    content,
  );
}
