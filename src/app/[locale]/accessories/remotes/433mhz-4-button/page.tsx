'use client';

import { useState } from "react";
import { QuoteButtons } from "@/components/seo/QuoteButtons";
import { AccessoriesLayout } from "@/components/accessories/AccessoriesLayout";
import { RfqModal } from "@/components/rfq/RfqModal";
import { createPageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";

export const metadata = createPageMetadata({
  title: "433MHz 4-Button RF Remote | FastFunRC",
  description:
    "Order the FastFunRC 433MHz 4-button remote with custom protocol support, matched receivers, and CE/FCC/RoHS certification packages.",
  path: "/accessories/remotes/433mhz-4-button/",
});

const breadcrumbItems = [
  { name: "Home", url: "https://www.fastfunrc.com/" },
  { name: "Accessories", url: "https://www.fastfunrc.com/accessories/" },
  { name: "Remotes", url: "https://www.fastfunrc.com/accessories/remotes/" },
  { name: "433MHz 4-Button Remote", url: "https://www.fastfunrc.com/accessories/remotes/433mhz-4-button/" }
];

export default function Remote433Page() {
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [rfqSource, setRfqSource] = useState('default');
  const logoSrc = getAssetPath("/logo-fastfun-remote.png");

  const openRfqModal = (source: string = 'default') => {
    setRfqSource(source);
    setIsRfqOpen(true);
  };

  const closeRfqModal = () => {
    setIsRfqOpen(false);
    setRfqSource('default');
  };

  const handleRfqSubmit = (result: {
    status: 'success' | 'error' | 'whatsapp' | 'mailto';
    message?: string;
    data?: any;
  }) => {
    if (result.status === 'success') {
      closeRfqModal();
    } else if (result.status === 'mailto') {
      const mailtoUrl: string | undefined = result.data?.mailtoUrl;
      if (mailtoUrl) {
        window.location.href = mailtoUrl;
      }
      return;
    } else if (result.status === 'whatsapp') {
      if (result.data?.mailtoUrl) {
        // Handle fallback to email client
        window.location.href = result.data.mailtoUrl;
        return;
      }
      // Handle WhatsApp click
      window.open('https://wa.me/8615899648898', '_blank', 'noopener');
      closeRfqModal();
    } else if (result.status === 'error') {
      // Error is already displayed in the modal, no additional action needed
      console.error('RFQ submission error:', result.message);
    }
  };

  return (
    <>
      <AccessoriesLayout
        title="433MHz 4-Button RF Remote"
        description="Compact ABS housing with custom key layout, rolling and fixed code firmware options, optional matched receiver module, and full certification support."
        breadcrumbItems={breadcrumbItems}
        className="max-w-5xl"
      >
        <article className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <Image
              src={logoSrc}
              alt="FastFunRC 433MHz 4-button remote"
              width={600}
              height={60}
              className="object-contain p-8 w-full h-full"
              style={{ maxWidth: '300px', maxHeight: '72px', margin: 'auto' }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">433MHz 4-Button RF Remote</h1>
            <p className="mt-4 text-slate-600">
              Compact ABS housing with custom key layout, rolling and fixed code firmware options, optional matched receiver module, and full certification support.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li>? Frequency options: 433.92 MHz �� 100 kHz, support for regional tuning.</li>
              <li>? Firmware: EV1527/PT2262 compatible or fully custom protocol.</li>
              <li>? Certifications: ISO9001 production line with CE/FCC/RoHS deliverables.</li>
              <li>? Services: Tooling, PCBA, RF tuning, and 7-day prototyping.</li>
            </ul>
            <QuoteButtons productName="433MHz 4-Button RF Remote" onOpenRfq={openRfqModal} />
          </div>
        </article>
      </AccessoriesLayout>
      
      <RfqModal
        open={isRfqOpen}
        onClose={closeRfqModal}
        onSubmit={handleRfqSubmit}
        source={rfqSource}
      />
    </>
  );
}
