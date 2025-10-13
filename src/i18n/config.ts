export const locales = ["en", "pt", "es", "fr", "it"] as const

export const defaultLocale = "en"

export const localeLabels: Record<(typeof locales)[number], string> = {
  en: "English",
  pt: "Português",
  es: "Español",
  fr: "Français",
  it: "Italiano",
}
