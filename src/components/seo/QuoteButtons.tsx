'use client';

import { RFQ_MAILTO_EMAIL } from '@/config/rfq-config';

interface QuoteButtonsProps {
  productName: string;
  onOpenRfq?: (source: string) => void;
}

function trackEvent(eventName: string, source?: string) {
  if (typeof window !== 'undefined' && 'console' in window) {
    console.log(`[Event] ${eventName}`, source ? { source } : '');
  }
}

export function QuoteButtons({ productName, onOpenRfq }: QuoteButtonsProps) {
  const handleQuoteClick = () => {
    trackEvent('rfq_submit', 'product_page');
    if (onOpenRfq) {
      onOpenRfq(`product_${productName}`);
    } else {
      // Fallback to mailto if no callback provided
      const subject = encodeURIComponent(`RFQ: ${productName}`);
      const body = encodeURIComponent(
        `Hi FastFunRC team,%0D%0AWe are interested in the ${productName}. Please share MOQ, pricing tiers, lead times, and certification options.%0D%0A`
      );
      window.location.href = `mailto:${RFQ_MAILTO_EMAIL}?subject=${subject}&body=${body}`;
    }
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'product_page');
    window.open('https://wa.me/8615899648898', '_blank', 'noopener');
  };

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={handleQuoteClick}
        className="inline-flex items-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600"
      >
        Get a Quote
      </button>
      <button
        onClick={handleWhatsAppClick}
        className="inline-flex items-center rounded-xl border border-green-500 px-6 py-3 text-sm font-semibold text-green-600 hover:bg-green-50"
      >
        WhatsApp Engineer
      </button>
    </div>
  );
}
