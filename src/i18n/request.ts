import { getRequestConfig } from "next-intl/server"
import { getMessages } from "./get-messages"
import type { Locale } from "./types"

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = (locale ?? "en") as Locale

  return {
    locale: resolvedLocale,
    messages: await getMessages(resolvedLocale),
  }
})
