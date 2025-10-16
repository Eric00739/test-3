"use client";

import Image from "next/image"
import { Globe, Shield, Phone, Send, Factory, MessageCircle, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { ReactNode } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { getAssetPath } from "@/lib/assets"
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { Button } from "@/components/ui/button"

interface SiteFooterProps {
  className?: string
  children?: ReactNode
}

export function SiteFooter({ className = "" }: SiteFooterProps) {
  const t = useTranslations("footer")
  const logoSrc = getAssetPath("/logo-fastfun-remote.png")

  const productLinks = [
    { href: "/products", label: t("sections.products.items.rfRemoteControls") },
    { href: "/products", label: t("sections.products.items.rfReceivers") },
    { href: "/products", label: t("sections.products.items.rfKits") },
    { href: "/products", label: t("sections.products.items.carRemotes") },
    { href: "/products", label: t("sections.products.items.wifiSwitches") },
    { href: "/products", label: t("sections.products.items.wifiSockets") },
    { href: "/products", label: t("sections.products.items.customOem") },
  ]

  const supportLinks = [
    { href: "/#capabilities", label: t("sections.support.items.documentation") },
    { href: "/#case-studies", label: t("sections.support.items.compliance") },
    { href: "/#process", label: t("sections.support.items.quality") },
    { href: "/contact", label: t("sections.support.items.factoryTour") },
    { href: "/contact", label: t("sections.support.items.contact") },
  ]

  const currentYear = new Date().getFullYear()
  const socialLinks = [
    { href: "#", label: t("social.links.linkedin"), icon: Linkedin },
    { href: "#", label: t("social.links.twitter"), icon: Twitter },
    { href: "#", label: t("social.links.facebook"), icon: Facebook },
    { href: "#", label: t("social.links.youtube"), icon: Youtube },
  ]

  const downloadLinks = [
    { href: "/assets/rfq-checklist.pdf", label: t("downloads.items.catalog") },
    { href: "#", label: t("downloads.items.rfqChecklist") },
    { href: "#", label: t("downloads.items.technicalGuide") },
  ]

  return (
    <footer className={`bg-slate-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center" aria-label="FastFun Remote">
              <Image
                src={logoSrc}
                alt="FastFun Remote wordmark"
                width={600}
                height={60}
                className="h-10 sm:h-12 w-auto"
              />
            </Link>
            <p className="text-slate-300 leading-relaxed max-w-md">{t("tagline")}</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center">
                <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
                {t("badges.shipping")}
              </span>
              <span className="flex items-center">
                <Shield className="h-4 w-4 mr-2" aria-hidden="true" />
                {t("badges.certified")}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t("sections.products.title")}</h3>
            <ul className="space-y-3 text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-300 hover:text-orange-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t("sections.support.title")}</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-300 hover:text-orange-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Social Media Links */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h4 className="mb-3 text-sm font-semibold">{t("social.title")}</h4>
              <div className="flex justify-center space-x-4 md:justify-start">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="text-center md:text-right">
              <h4 className="mb-3 text-sm font-semibold">{t("downloads.title")}</h4>
              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:justify-end">
                {downloadLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-slate-300 transition-colors hover:text-orange-500"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="grid md:grid-cols-4 gap-8 text-center md:text-left text-sm">
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="h-5 w-5 text-orange-500 mr-3" aria-hidden="true" />
              <div>
                <div className="text-slate-400">{t("contact.phoneLabel")}</div>
                <div className="font-semibold text-white">{t("contact.phone")}</div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Send className="h-5 w-5 text-orange-500 mr-3" aria-hidden="true" />
              <div>
                <div className="text-slate-400">{t("contact.emailLabel")}</div>
                <div className="font-semibold text-white">{t("contact.email")}</div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Factory className="h-5 w-5 text-orange-500 mr-3" aria-hidden="true" />
              <div>
                <div className="text-slate-400">{t("contact.factoryLabel")}</div>
                <div className="font-semibold text-white max-w-xs">{t("contact.address")}</div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <MessageCircle className="h-5 w-5 text-orange-500 mr-3" aria-hidden="true" />
              <div>
                <div className="text-slate-400">{t("contact.whatsappLabel")}</div>
                <div className="font-semibold text-white">{t("contact.whatsapp")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-slate-400 gap-4">
            <div className="flex-1">{t("legal.rights", { year: currentYear })}</div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="hover:text-orange-500 transition-colors">
                {t("legal.privacy")}
              </Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">
                {t("legal.terms")}
              </Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">
                {t("legal.compliance")}
              </Link>
            </div>
            <LanguageSwitcher variant="menu" className="md:max-w-[180px]" />
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center">
              Compatibility info only. Non-OEM / not affiliated. All trademarks belong to their owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
