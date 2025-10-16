"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Search, Settings, ShoppingCart, ChevronRight } from "lucide-react";

export function TaskRoutingSection() {
  const t = useTranslations("taskRouting");
  
  const handleCardClick = (cardId: string) => {
    // Navigate to the appropriate section
    const sectionMap: Record<string, string> = {
      compatibility: 'compatibility',
      config: 'process-new',
      products: 'extended-products'
    };
    
    const targetSection = sectionMap[cardId];
    if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const cards = [
    {
      id: "compatibility",
      icon: Search,
      color: "from-blue-500 to-blue-600",
      title: t("cards.0.title"),
      description: t("cards.0.description"),
      cta: t("cards.0.cta"),
    },
    {
      id: "config",
      icon: Settings,
      color: "from-green-500 to-green-600",
      title: t("cards.1.title"),
      description: t("cards.1.description"),
      cta: t("cards.1.cta"),
    },
    {
      id: "products",
      icon: ShoppingCart,
      color: "from-orange-500 to-orange-600",
      title: t("cards.2.title"),
      description: t("cards.2.description"),
      cta: t("cards.2.cta"),
    },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group cursor-pointer"
                onClick={() => handleCardClick(card.id)}
              >
                <div className="p-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600 mb-4">{card.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 group-hover:border-orange-300 group-hover:text-orange-700 transition-all duration-300"
                  >
                    {card.cta}
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
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