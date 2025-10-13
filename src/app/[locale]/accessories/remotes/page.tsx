import { createPageMetadata } from "@/lib/metadata";
import { AccessoriesLayout } from "@/components/accessories/AccessoriesLayout";
import { ProductCard } from "@/components/accessories/ProductCard";

export const metadata = createPageMetadata({
  title: "RF Remote Controls | FastFunRC",
  description:
    "Browse FastFunRC RF remote controls covering 433/315/868/915 MHz with custom housings, protocols, and rapid prototyping.",
  path: "/accessories/remotes/",
});

const breadcrumbItems = [
  { name: "Home", url: "https://www.fastfunrc.com/" },
  { name: "Accessories", url: "https://www.fastfunrc.com/accessories/" },
  { name: "Remotes", url: "https://www.fastfunrc.com/accessories/remotes/" }
];

export default function RemotesPage() {
  return (
    <AccessoriesLayout
      title="RF Remote Controls"
      description="Custom remote transmitters with matched receivers, PCBA, and certification-ready tooling delivered by FastFunRC."
      breadcrumbItems={breadcrumbItems}
    >
      <section className="grid gap-6 sm:grid-cols-2">
        <ProductCard
          title="433MHz 4-Button Remote"
          description="Compact housing with rolling code support, CE/FCC compliance, and 7-day prototyping turnarounds."
          href="/accessories/remotes/433mhz-4-button"
        />
        <ProductCard
          title="915MHz Industrial Remote"
          description="Ruggedized enclosure, IP65 sealing, and custom PCBA options for long-range industrial control."
          href="/accessories/remotes/915mhz-industrial"
        />
      </section>
    </AccessoriesLayout>
  );
}