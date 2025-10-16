import { notFound } from "next/navigation"
import type { Locale } from "./types"

export async function getMessages(locale: Locale) {
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default
    return messages
  } catch (error) {
    console.error(`Missing messages for locale "${locale}". Falling back to "en"`, error)
    
    // Fallback to English if locale is missing
    try {
      const fallbackMessages = (await import(`@/messages/en.json`)).default
      return fallbackMessages
    } catch (fallbackError) {
      console.error(`Critical: Even fallback messages for "en" are missing.`, fallbackError)
      notFound()
    }
  }
}
