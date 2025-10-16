"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Search, Package, ChevronRight } from "lucide-react";

export function CompatibilityCenterSection() {
  const t = useTranslations("compatibility");

  const results = [
    {
      id: 1,
      model: "FF-RC433-04B",
      grade: "A",
      caveats: "Direct replacement with identical frequency and encoding",
      available: true
    },
    {
      id: 2,
      model: "FF-RC433-02B + FF-RX433-01",
      grade: "B",
      caveats: "Remote + receiver combo required for full compatibility",
      available: true
    },
    {
      id: 3,
      model: "FF-RC433-08B",
      grade: "C",
      caveats: "Universal learning remote - requires programming",
      available: true
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Compatibility/Replacement Finder</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Search Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="p-6 bg-white shadow-lg border-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter original brand / model / band (e.g., Somfy / TELIS-4 / 433.42)"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Results Template */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Compatibility Results</h3>
          <div className="space-y-4 mb-8">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-white shadow hover:shadow-lg transition-all duration-300 border-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{t("template.recommendedModel")}</p>
                      <p className="font-semibold text-gray-900">{result.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{t("template.compatibilityGrade")}</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        result.grade === 'A' ? 'bg-green-100 text-green-800' :
                        result.grade === 'B' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        Grade {result.grade}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{t("template.keyCaveats")}</p>
                      <p className="text-sm text-gray-700">{result.caveats}</p>
                    </div>
                    <div className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 hover:text-orange-800"
                      >
                        <Package className="h-4 w-4 mr-2" />
                        {t("template.requestSamples")}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Legal Notice */}
          <Card className="p-4 bg-slate-100 border-0">
            <p className="text-xs text-slate-600 text-center">
              {t("template.legalNotice")}
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}