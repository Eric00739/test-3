"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, Send, ChevronUp, ChevronDown, X } from "lucide-react";

interface StickyActionsProps {
  onOpenRfq: (source: string) => void;
  onWhatsApp: (source: string) => void;
}

export function StickyActions({ onOpenRfq, onWhatsApp }: StickyActionsProps) {
  const t = useTranslations("stickyActions");
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 z-40 flex justify-end">
        <button
          onClick={() => {
            setIsMinimized(false);
            setIsExpanded(false);
          }}
          className="rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg border border-slate-200 hover:bg-white"
        >
          {t("show")}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 z-40 flex justify-end">
      <div className="flex w-full max-w-sm flex-col items-end gap-3 sm:w-auto">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              className="w-full rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-100 sm:w-80"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{t("title")}</h4>
                  <p className="mt-1 text-sm text-slate-600">{t("description")}</p>
                </div>
                <button
                  type="button"
                  aria-label={t("hide")}
                  onClick={() => {
                    setIsMinimized(true);
                    setIsExpanded(false);
                  }}
                  className="rounded-full bg-slate-100 p-1.5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => {
                    onOpenRfq("sticky_quote");
                    setIsExpanded(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700 transition-colors hover:bg-orange-100"
                >
                  <span>{t("quote")}</span>
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => {
                    onWhatsApp("sticky_whatsapp");
                    setIsExpanded(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
                >
                  <span>{t("whatsapp")}</span>
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-2 shadow-xl backdrop-blur">
          <button
            onClick={() => {
              onOpenRfq("sticky_quote");
              setIsExpanded(false);
            }}
            className="flex items-center gap-2 rounded-full bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            <span>{t("quote")}</span>
          </button>
          <button
            onClick={() => {
              onWhatsApp("sticky_whatsapp");
              setIsExpanded(false);
            }}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <MessageCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
            <span>{t("whatsapp")}</span>
          </button>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? t("hide") : t("title")}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-slate-200"
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
