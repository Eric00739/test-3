import { createPageMetadata } from "@/lib/metadata";
import { AccessoriesLayout } from "@/components/accessories/AccessoriesLayout";
import { ProductCard } from "@/components/accessories/ProductCard";

export const metadata = createPageMetadata({
  title: "RF Accessories | FastFunRC",
  description:
    "Explore FastFunRC accessories for RF remote systems, gateways, and smart controllers with in-house tooling and certification support.",
  path: "/accessories/",
});

const breadcrumbItems = [
  { name: "Home", url: "https://www.fastfunrc.com/" },
  { name: "Accessories", url: "https://www.fastfunrc.com/accessories/" },
];

export default function AccessoriesPage() {
  return (
    <AccessoriesLayout
      title="RF Accessories"
      description="OEM/ODM accessories engineered to pair with FastFunRC RF remotes, gateways, and Wi-Fi controllers."
      breadcrumbItems={breadcrumbItems}
    >
      <section className="grid gap-6 sm:grid-cols-2">
        <ProductCard
          title="433/868 MHz Receivers"
          description="Superheterodyne receivers with custom firmware, PCBA options, and housing packages to match your remote line."
          href="/accessories/receivers"
        />
        <ProductCard
          title="Smart Gateway Modules"
          description="Wi-Fi and BLE combinations with cloud-ready API support, ready for CE/FCC/RoHS approvals."
          href="/accessories/gateways"
        />
      </section>
    </AccessoriesLayout>
  );
}