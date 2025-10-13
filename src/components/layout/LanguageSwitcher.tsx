"use client"

import { useTransition } from "react"
import { Languages } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { localeLabels, locales } from "@/i18n/config"
import { cn } from "@/lib/utils"

const localeFlag: Record<(typeof locales)[number], string> = {
  en: "🇺🇸",
  pt: "🇧🇷",
  es: "🇪🇸",
  fr: "🇫🇷",
  it: "🇮🇹",
}

export interface LanguageSwitcherProps {
  variant?: "inline" | "menu"
  className?: string
}

export function LanguageSwitcher({ variant = "inline", className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations("languageSwitcher")

  const handleChange = (nextLocale: (typeof locales)[number]) => {
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div className={cn("relative", variant === "inline" ? "min-w-[120px]" : "w-full", className)} aria-live="polite">
      <label className="sr-only" htmlFor={`language-switcher-${variant}`}>
        {t("label")}
      </label>
      <div
        className={`flex items-center gap-2 rounded-full border ${
          variant === "inline" ? "border-gray-200 bg-white/80 backdrop-blur" : "border-gray-300 bg-white"
        } px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors focus-within:border-orange-500`}
      >
        <Languages className="h-4 w-4 text-orange-500" aria-hidden="true" />
        <select
          id={`language-switcher-${variant}`}
          className={`w-full appearance-none bg-transparent pr-5 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none ${
            isPending ? "opacity-70" : ""
          }`}
          value={locale}
          onChange={(event) => handleChange(event.target.value as (typeof locales)[number])}
        >
          {locales.map((code) => (
            <option key={code} value={code}>
              {`${localeFlag[code]} ${localeLabels[code]}`}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-gray-400">
          ▾
        </span>
      </div>
    </div>
  )
}
