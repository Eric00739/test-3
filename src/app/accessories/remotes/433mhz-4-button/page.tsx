import type { Metadata } from "next";
import Image from "next/image";
import { QuoteButtons } from "@/components/seo/QuoteButtons";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildBreadcrumbJsonLd, stringifyJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "433MHz 4-Button RF Remote | FastFunRC",
  description:
    "Order the FastFunRC 433MHz 4-button remote with custom protocol support, matched receivers, and CE/FCC/RoHS certification packages.",
  alternates: {
    canonical: "https://www.fastfunrc.com/accessories/remotes/433mhz-4-button/",
  },
};

const breadcrumbItems = [
  { name: "Home", url: "https://www.fastfunrc.com/" },
  { name: "Accessories", url: "https://www.fastfunrc.com/accessories/" },
  { name: "Remotes", url: "https://www.fastfunrc.com/accessories/remotes/" },
  { name: "433MHz 4-Button Remote", url: "https://www.fastfunrc.com/accessories/remotes/433mhz-4-button/" }
];

export default function Remote433Page() {
  const jsonLd = stringifyJsonLd(buildBreadcrumbJsonLd(breadcrumbItems));

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      <article className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <Image
            src="/assets/logo-512.png"
            alt="FastFunRC 433MHz 4-button remote"
            fill
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">433MHz 4-Button RF Remote</h1>
          <p className="mt-4 text-slate-600">
            Compact ABS housing with custom key layout, rolling and fixed code firmware options, optional matched receiver module, and full certification support.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li>• Frequency options: 433.92 MHz ± 100 kHz, support for regional tuning.</li>
            <li>• Firmware: EV1527/PT2262 compatible or fully custom protocol.</li>
            <li>• Certifications: ISO9001 production line with CE/FCC/RoHS deliverables.</li>
            <li>• Services: Tooling, PCBA, RF tuning, and 7-day prototyping.</li>
          </ul>
          <QuoteButtons productName="433MHz 4-Button RF Remote" />
        </div>
      </article>
    </main>
  );
}
