"use client";

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { getAssetPath } from "@/lib/assets"
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"

interface SiteFooterProps {
  className?: string
}

export function SiteFooter({ className = "" }: SiteFooterProps) {
  const t = useTranslations("footer")
  const navT = useTranslations("nav")
  const logoSrc = getAssetPath("/logo-fastfun-remote.png")

  const currentYear = 2025

  return (
    <footer className={`bg-slate-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="FastFun Remote">
            <Image
              src={logoSrc}
              alt="FastFun Remote wordmark"
              width={600}
              height={60}
              className="h-10 w-auto"
            />
          </Link>

          {/* Essential Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link href="/products" className="text-slate-300 hover:text-orange-500 transition-colors">
              {t("sections.products.title")}
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-orange-500 transition-colors">
              {t("sections.support.items.contact")}
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-orange-500 transition-colors">
              {navT("about")}
            </Link>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-slate-800 pt-8 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-slate-400 gap-4">
              <div className="flex-1 text-center md:text-left">
                {t("legal.rights", { year: currentYear })}
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="#" className="hover:text-orange-500 transition-colors">
                  {t("legal.privacy")}
                </Link>
                <Link href="#" className="hover:text-orange-500 transition-colors">
                  {t("legal.terms")}
                </Link>
              </div>
              <LanguageSwitcher variant="menu" className="md:max-w-[180px]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
