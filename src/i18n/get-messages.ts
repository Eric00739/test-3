import { notFound } from "next/navigation"
import type { Locale } from "./types"

type Messages = Record<string, any>

function deepMerge(base: Messages, override: Messages): Messages {
  const result: any = Array.isArray(base) ? [...base] : { ...base }

  for (const [key, value] of Object.entries(override)) {
    const baseValue = (result as Messages)[key]

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(baseValue as Messages, value as Messages)
    } else if (value !== undefined) {
      result[key] = value
    }
  }

  return result as Messages
}

export async function getMessages(locale: Locale) {
  const defaultMessages = (await import("@/messages/en.json")).default as Messages

  if (locale === "en") {
    return defaultMessages
  }

  try {
    const localeMessages = (await import(`@/messages/${locale}.json`)).default as Messages
    return deepMerge(defaultMessages, localeMessages)
  } catch (error) {
    console.error(`Missing messages for locale "${locale}". Falling back to "en"`, error)

    if (defaultMessages) {
      return defaultMessages
    }

    console.error(`Critical: Even fallback messages for "en" are missing.`)
    notFound()
  }
}
