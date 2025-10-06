"use client";

interface QuoteButtonsProps {
  productName: string;
}

function buildMailto(productName: string) {
  const subject = encodeURIComponent(`RFQ: ${productName}`);
  const body = encodeURIComponent(
    `Hi FastFunRC team,%0D%0AWe are interested in the ${productName}. Please share MOQ, pricing tiers, lead times, and certification options.%0D%0A`
  );
  return `mailto:eric@fastfunrc.com?subject=${subject}&body=${body}`;
}

export function QuoteButtons({ productName }: QuoteButtonsProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a
        href={buildMailto(productName)}
        className="inline-flex items-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600"
      >
        Request Quotation
      </a>
      <a
        href="https://wa.me/8615899648898"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center rounded-xl border border-green-500 px-6 py-3 text-sm font-semibold text-green-600 hover:bg-green-50"
      >
        WhatsApp Engineer
      </a>
    </div>
  );
}
