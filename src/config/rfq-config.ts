const DEFAULT_RFQ_EMAIL = "eric@fastfunrc.com"
const DEFAULT_FROM_EMAIL = "morningdewtech@gmail.com"

const asTrimmed = (value?: string | null) => (value ? value.trim() : undefined)

export const RFQ_MAILTO_EMAIL =
  asTrimmed(process.env.NEXT_PUBLIC_RFQ_EMAIL) ?? DEFAULT_RFQ_EMAIL

export interface EmailJsConfig {
  serviceId?: string
  templateId?: string
  publicKey?: string
}

export interface SmtpConfig {
  host?: string
  port?: number
  user?: string
  pass?: string
}

export interface ServerRfqConfig {
  toEmail: string
  fromEmail: string
  resendFromEmail?: string
  formspreeFormId?: string
  emailJs: EmailJsConfig
  smtp: SmtpConfig
}

export function getServerRfqConfig(): ServerRfqConfig {
  const toEmail = asTrimmed(process.env.RFQ_TO_EMAIL) ?? DEFAULT_RFQ_EMAIL
  const resendFromEmail = asTrimmed(process.env.RESEND_FROM_EMAIL)
  const configuredFromEmail =
    asTrimmed(process.env.RFQ_FROM_EMAIL) ?? resendFromEmail ?? DEFAULT_FROM_EMAIL

  const smtpPortRaw = asTrimmed(process.env.RFQ_SMTP_PORT)
  const smtpPort =
    smtpPortRaw && Number.isFinite(Number(smtpPortRaw))
      ? Number(smtpPortRaw)
      : undefined

  return {
    toEmail,
    fromEmail: configuredFromEmail,
    resendFromEmail,
    formspreeFormId: asTrimmed(process.env.FORMSPREE_FORM_ID),
    emailJs: {
      serviceId: asTrimmed(process.env.EMAILJS_SERVICE_ID),
      templateId: asTrimmed(process.env.EMAILJS_TEMPLATE_ID),
      publicKey: asTrimmed(process.env.EMAILJS_PUBLIC_KEY),
    },
    smtp: {
      host: asTrimmed(process.env.RFQ_SMTP_HOST),
      port: smtpPort,
      user: asTrimmed(process.env.RFQ_SMTP_USER),
      pass: asTrimmed(process.env.RFQ_SMTP_PASS),
    },
  }
}
