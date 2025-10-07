import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildBreadcrumbJsonLd, stringifyJsonLd } from "@/lib/seo";
import { createPageMetadata } from "@/lib/metadata";

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
  const jsonLd = stringifyJsonLd(buildBreadcrumbJsonLd(breadcrumbItems));

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">RF Accessories</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          OEM/ODM accessories engineered to pair with FastFunRC RF remotes, gateways, and Wi-Fi controllers.
        </p>
      </header>
      <section className="grid gap-6 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">433/868 MHz Receivers</h2>
          <p className="mt-2 text-sm text-slate-600">
            Superheterodyne receivers with custom firmware, PCBA options, and housing packages to match your remote line.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Smart Gateway Modules</h2>
          <p className="mt-2 text-sm text-slate-600">
            Wi-Fi and BLE combinations with cloud-ready API support, ready for CE/FCC/RoHS approvals.
          </p>
        </article>
      </section>
    </main>
  );
}