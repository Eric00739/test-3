"use client"

import { Shield, Award, TrendingUp, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TrustSectionProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
}

const partnerHighlights = [
  { name: 'Nice', region: '欧盟门控系统' },
  { name: 'LiftMaster', region: '北美' },
  { name: 'Somfy', region: '智能遮阳' },
  { name: 'Tuya', region: 'IoT联盟' },
  { name: 'CAME', region: '工业通道' },
]

const trustSignals = [
  {
    icon: Award,
    headline: '47 NPI/年',
    description: '从规格到出货，专门处理RF和IoT产品。',
  },
  {
    icon: Shield,
    headline: '合格实验室',
    description: 'CE RED、FCC Part 15、UKCA预检和认证合作伙伴。',
  },
  {
    icon: TrendingUp,
    headline: '98.7% FPY',
    description: '可追溯PCBA、AOI、RF调谐和100%出厂QC。',
  },
  {
    icon: Globe,
    headline: '28个出口市场',
    description: '定制包装、多语言手册和直接发货支持。',
  },
]

export function TrustSection({ onOpenRfq, onWhatsApp }: TrustSectionProps) {
  return (
    <section className="bg-slate-900 py-16 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              值得信赖的OEM/ODM合作伙伴
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              门控巨头和IoT初创公司都建立在FastFunRC生产基础上
            </h2>
            <p className="text-base text-white/70 sm:text-lg">
              从遥控发射器和接收器到Wi-Fi开关，我们在一个屋檐下处理工具、PCBA、RF调谐和认证，
              让您的发布团队专注于产品市场匹配。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100"
              onClick={() => onOpenRfq('trust_cta')}
            >
              联系销售
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/70 bg-transparent text-white hover:bg-white/15 hover:!text-white hover:border-white"
              onClick={() => onWhatsApp('trust_whatsapp')}
            >
              请求回电
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {partnerHighlights.map((partner) => (
            <div
              key={partner.name}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-center text-white shadow-[0_18px_30px_-20px_rgba(15,23,42,0.65)]"
            >
              <div className="text-sm font-semibold sm:text-base">{partner.name}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-white/60">{partner.region}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustSignals.map(({ icon: Icon, headline, description }) => (
            <div
              key={headline}
              className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-[0_25px_40px_-28px_rgba(14,165,233,0.55)]"
            >
              <div className="rounded-full bg-white/15 p-3">
                <Icon className="h-5 w-5 text-orange-300" aria-hidden="true" />
              </div>
              <div>
                <div className="text-lg font-semibold">{headline}</div>
                <p className="mt-1 text-sm text-white/70">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
