"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Car, Wifi, Zap, ChevronRight } from "lucide-react";

export function ExtendedProductsSection() {
  const t = useTranslations("extendedProducts");

  const products = [
    {
      id: "automotive",
      icon: Car,
      color: "from-green-500 to-green-600",
      title: t("automotive.title"),
      description: t("automotive.description"),
      boundary: t("automotive.boundary"),
      cta: t("automotive.cta"),
    },
    {
      id: "wifiSwitch",
      icon: Wifi,
      color: "from-blue-500 to-blue-600",
      title: t("wifiSwitch.title"),
      description: t("wifiSwitch.description"),
      boundary: t("wifiSwitch.boundary"),
      cta: t("wifiSwitch.cta"),
    },
    {
      id: "wifiPlug",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      title: t("wifiPlug.title"),
      description: t("wifiPlug.description"),
      boundary: t("wifiPlug.boundary"),
      cta: t("wifiPlug.cta"),
    },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                <div className="p-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-4`}>
                    <product.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-slate-600 mb-4">{product.description}</p>
                  <div className="bg-slate-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-slate-600">{product.boundary}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {product.cta}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}