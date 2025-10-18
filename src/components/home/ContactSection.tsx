"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, MessageCircle, Send, ClipboardCheck, Clock3 } from "lucide-react";

interface ContactSectionProps {
  onOpenRfq: (source: string) => void;
  onWhatsApp: (source: string) => void;
}

const HIGHLIGHTS = [
  {
    icon: Shield,
    title: "Certified manufacturing",
    description: "ISO 9001:2015 plant with CE, FCC, KC and RoHS documentation ready for audits.",
  },
  {
    icon: ClipboardCheck,
    title: "Engineering review under 12 hours",
    description: "RF engineers validate frequency, encoding and receiver pairing before pricing.",
  },
  {
    icon: MessageCircle,
    title: "Single project owner",
    description: "One coordinator follows samples, compliance paperwork and pilot production.",
  },
] as const;

const RESPONSE_TIMELINE = [
  { title: "Ticket created instantly", description: "Automatic RFQ ID + NDA option if required." },
  { title: "Engineer feedback", description: "Compatibility notes & pricing targets within 12 business hours." },
  { title: "Sample plan & lead time", description: "2-5 day sample dispatch with full documentation pack." },
] as const;

export function ContactSection({ onOpenRfq, onWhatsApp }: ContactSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kick off your RFQ</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Tell us about your remote or receiver program and our engineering team will respond with compatibility notes,
            pricing tiers and sampling plan inside one business day.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <div className="rounded-full bg-orange-50 p-3 text-orange-600">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="h-full rounded-2xl bg-slate-900 text-slate-100 p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 text-orange-300 text-sm uppercase tracking-wide">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
                <span>What happens after you click quote</span>
              </div>
              <ul className="mt-6 space-y-5">
                {RESPONSE_TIMELINE.map(({ title, description }) => (
                  <li key={title}>
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">{description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 text-xs text-slate-400">Avg. RFQ response SLA: 8h | Samples shipped weekly from Shenzhen HQ.</p>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4"
            onClick={() => onOpenRfq("contact_start")}
          >
            <Send className="h-5 w-5 mr-2" />
            Start Request
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4"
            onClick={() => onWhatsApp("contact_whatsapp")}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Talk on WhatsApp
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">
          A support ticket is created instantly and your dedicated project owner keeps every update in one thread.
        </p>
      </div>
    </section>
  );
}
