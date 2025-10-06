export type BreadcrumbItem = {
  name: string;
  url: string;
};

type JsonLdBreadcrumb = {
  "@context": string;
  "@type": string;
  itemListElement: {
    "@type": string;
    position: number;
    name: string;
    item: string;
  }[];
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdBreadcrumb {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function stringifyJsonLd(data: JsonLdBreadcrumb): string {
  return JSON.stringify(data, null, 2);
}
