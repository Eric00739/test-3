import { notFound } from "next/navigation"
import type { Locale } from "./types"

export async function getMessages(locale: Locale) {
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default
    return messages
  } catch (error) {
    console.error(`Missing messages for locale "${locale}".`, error)
    notFound()
  }
}
