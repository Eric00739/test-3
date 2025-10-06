import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildBreadcrumbJsonLd, stringifyJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "RF Remote Controls | FastFunRC",
  description:
    "Browse FastFunRC RF remote controls covering 433/315/868/915 MHz with custom housings, protocols, and rapid prototyping.",
  alternates: {
    canonical: "https://www.fastfunrc.com/accessories/remotes/",
  },
};

const breadcrumbItems = [
  { name: "Home", url: "https://www.fastfunrc.com/" },
  { name: "Accessories", url: "https://www.fastfunrc.com/accessories/" },
  { name: "Remotes", url: "https://www.fastfunrc.com/accessories/remotes/" }
];

export default function RemotesPage() {
  const jsonLd = stringifyJsonLd(buildBreadcrumbJsonLd(breadcrumbItems));

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">RF Remote Controls</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Custom remote transmitters with matched receivers, PCBA, and certification-ready tooling delivered by FastFunRC.
        </p>
      </header>
      <section className="grid gap-6 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">433MHz 4-Button Remote</h2>
          <p className="mt-2 text-sm text-slate-600">
            Compact housing with rolling code support, CE/FCC compliance, and 7-day prototyping turnarounds.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">915MHz Industrial Remote</h2>
          <p className="mt-2 text-sm text-slate-600">
            Ruggedized enclosure, IP65 sealing, and custom PCBA options for long-range industrial control.
          </p>
        </article>
      </section>
    </main>
  );
}
