"use client"

import { useTransition } from "react"
import { Languages } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { localeLabels, locales } from "@/i18n/config"
import { cn } from "@/lib/utils"

const localeFlag: Record<(typeof locales)[number], string> = {
  en: "馃嚭馃嚫",
  pt: "馃嚙馃嚪",
  es: "馃嚜馃嚫",
  fr: "馃嚝馃嚪",
  it: "馃嚠馃嚬",
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
    <div className={cn("relative", variant === "inline" ? "min-w-[190px]" : "w-full", className)} aria-live="polite">
      <label className="sr-only" htmlFor={`language-switcher-${variant}`}>
        {t("label")}
      </label>
      <div
        className={`flex items-center gap-2 rounded-full border shadow-sm ${
          variant === "inline" ? "border-gray-200 bg-white/90 backdrop-blur" : "border-gray-300 bg-white"
        } ${variant === "inline" ? "px-5 py-2.5" : "px-4 py-3"} text-base font-medium text-gray-600 transition-colors focus-within:border-orange-500 hover:border-gray-300`}
      >
        <Languages className={`text-orange-500 ${variant === "inline" ? "h-6 w-6" : "h-5 w-5"}`} aria-hidden="true" />
        <select
          id={`language-switcher-${variant}`}
          className={`w-full appearance-none bg-transparent ${variant === "inline" ? "pr-7" : "pr-6"} text-base font-medium text-gray-800 focus:outline-none ${
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
        <span className={`pointer-events-none absolute inset-y-0 ${variant === "inline" ? "right-5" : "right-4"} flex items-center text-sm text-gray-400`}>
          鈻?
        </span>
      </div>
    </div>
  )
}

