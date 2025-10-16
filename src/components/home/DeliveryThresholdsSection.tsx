"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function DeliveryThresholdsSection() {
  const t = useTranslations("delivery");
  
  const rows = [
    {
      option: "In-stock/Generic",
      moq: "50–200 units",
      nre: "None",
      leadTime: "2–5 days (samples), 7–15 days (production)",
      notes: "Standard configurations only"
    },
    {
      option: "Configurable (small-batch)",
      moq: "200–500 units",
      nre: "Usually none",
      leadTime: "7–15 days (samples), 15–25 days (production)",
      notes: "Band/code/buttons/appearance/MOQ variations"
    },
    {
      option: "Deep customization",
      moq: "500+ units",
      nre: "Varies by project",
      leadTime: "15–30 days (samples), 30–45 days (production)",
      notes: "Custom tooling, firmware, app development"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden shadow-xl border-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">{t("headers.option")}</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">{t("headers.moq")}</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">{t("headers.nre")}</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">{t("headers.leadTime")}</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">{t("headers.notes")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900 text-sm">{row.option}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{row.moq}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{row.nre}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{row.leadTime}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-0">
            <p className="text-sm text-slate-700 text-center">
              <strong>NRE Rebate:</strong> NRE rebate available after 12 months with 1000 unit orders — 50% rebate on NRE fees.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}