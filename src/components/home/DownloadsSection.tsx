"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Download, FileText, Wrench, Package, Box, Grid3X3 } from "lucide-react";

export function DownloadsSection() {
  const t = useTranslations("downloads");
  
  const items = [
    {
      id: "datasheets",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      title: t("items.0.title"),
      description: t("items.0.description")
    },
    {
      id: "wiring",
      icon: Wrench,
      color: "from-green-500 to-green-600",
      title: t("items.1.title"),
      description: t("items.1.description")
    },
    {
      id: "pairing",
      icon: Package,
      color: "from-purple-500 to-purple-600",
      title: t("items.2.title"),
      description: t("items.2.description")
    },
    {
      id: "enclosure",
      icon: Box,
      color: "from-orange-500 to-orange-600",
      title: t("items.3.title"),
      description: t("items.3.description")
    },
    {
      id: "matrix",
      icon: Grid3X3,
      color: "from-teal-500 to-teal-600",
      title: t("items.4.title"),
      description: t("items.4.description")
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'datasheet': return FileText;
      case 'wiring': return Wrench;
      case 'pairing': return Package;
      case 'enclosure': return Box;
      case 'matrix': return Grid3X3;
      default: return FileText;
    }
  };

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group cursor-pointer">
                <div className="p-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 group-hover:border-orange-300 group-hover:text-orange-700 transition-all duration-300"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Need documents for a specific project?</h3>
            <p className="text-center text-slate-600 mb-6">
              Tell us the target product or retrofit scenario and we will curate the right files.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Download className="h-5 w-5 mr-2" />
                Request document pack
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                Browse all resources
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}