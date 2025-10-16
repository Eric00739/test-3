"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { CheckCircle, FileText, Settings, Shield, Package } from "lucide-react";

export function ProcessTimelineSection() {
  const t = useTranslations("process");
  
  const steps = [
    {
      id: 1,
      icon: CheckCircle,
      color: "from-blue-500 to-blue-600",
      title: t("steps.0.title"),
      duration: t("steps.0.duration"),
      deliverable: t("steps.0.deliverable"),
      description: t("steps.0.description")
    },
    {
      id: 2,
      icon: Settings,
      color: "from-green-500 to-green-600",
      title: t("steps.1.title"),
      duration: t("steps.1.duration"),
      deliverable: t("steps.1.deliverable"),
      description: t("steps.1.description")
    },
    {
      id: 3,
      icon: Package,
      color: "from-purple-500 to-purple-600",
      title: t("steps.2.title"),
      duration: t("steps.2.duration"),
      deliverable: t("steps.2.deliverable"),
      description: t("steps.2.description")
    },
    {
      id: 4,
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      title: t("steps.3.title"),
      duration: t("steps.3.duration"),
      deliverable: t("steps.3.deliverable"),
      description: t("steps.3.description")
    },
    {
      id: 5,
      icon: FileText,
      color: "from-teal-500 to-teal-600",
      title: t("steps.4.title"),
      duration: t("steps.4.duration"),
      deliverable: t("steps.4.deliverable"),
      description: t("steps.4.description")
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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-300"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-slate-300 rounded-full z-10">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.color}`}></div>
                </div>

                {/* Content card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-xs font-medium text-slate-700">
                            <strong>Deliverable:</strong> {step.deliverable}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-full md:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}