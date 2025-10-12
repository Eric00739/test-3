import Image from "next/image"
import Link from "next/link"
import { Globe, Shield, Phone, Send, Factory, MessageCircle } from "lucide-react"
import { ReactNode } from "react"

interface SiteFooterProps {
  className?: string
  children?: ReactNode
}

export function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer className={`bg-slate-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6" aria-label="FastFun Remote">
              <Image
                src="/logo-fastfun-remote.png"
                alt="FastFun Remote wordmark"
                width={220}
                height={64}
                className="h-10 sm:h-12 w-auto"
                loading="lazy"
                sizes="(max-width: 768px) 180px, 220px"
              />
            </Link>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              FastFun Remote – Your Trusted IoT Partner Since 2010. ISO-certified electronics manufacturing delivering
              precision smart devices with 98.7% FPY. 15 years experience, 47 NPI projects annually.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Global Shipping
              </span>
              <span className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                ISO 9001 Certified
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="text-slate-300 hover:text-orange-500 transition-colors">RF Remote Controls</Link></li>
              <li><Link href="/products" className="text-slate-300 hover:text-orange-500 transition-colors">RF Receivers</Link></li>
              <li><Link href="/products" className="text-slate-300 hover:text-orange-500 transition-colors">RF Kits</Link></li>
              <li><Link href="/products" className="text-slate-300 hover:text-orange-500 transition-colors">Car Remotes</Link></li>
              <li><Link href="/products" className="text-slate-300 hover:text-orange-500 transition-colors">Wi-Fi Switches</Link></li>
              <li><Link href="/products" className="text-slate-300 hover:text-orange-500 transition-colors">Wi-Fi Sockets</Link></li>
              <li><Link href="/products" className="text-slate-300 hover:text-orange-500 transition-colors">Custom OEM/ODM</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#capabilities" className="text-slate-300 hover:text-orange-500 transition-colors">Technical Documentation</Link></li>
              <li><Link href="/#case-studies" className="text-slate-300 hover:text-orange-500 transition-colors">Compliance Certificates</Link></li>
              <li><Link href="/#process" className="text-slate-300 hover:text-orange-500 transition-colors">Quality Assurance</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-orange-500 transition-colors">Factory Tour</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-orange-500 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="grid md:grid-cols-4 gap-8 text-center md:text-left text-sm">
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="h-5 w-5 text-orange-500 mr-3" />
              <div>
                <div className="text-slate-400">Direct Phone</div>
                <div className="font-semibold text-white">+86 158 9964 8898</div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Send className="h-5 w-5 text-orange-500 mr-3" />
              <div>
                <div className="text-slate-400">Sales Email</div>
                <div className="font-semibold text-white">eric@fastfunrc.com</div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Factory className="h-5 w-5 text-orange-500 mr-3" />
              <div>
                <div className="text-slate-400">Factory Address</div>
                <div className="font-semibold text-white">
                  8F, Building 1, Huawei Ke Valley, Dalingshan Town,
                  Dongguan, Guangdong, China
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <MessageCircle className="h-5 w-5 text-orange-500 mr-3" />
              <div>
                <div className="text-slate-400">WhatsApp</div>
                <div className="font-semibold text-white">+86 158 9964 8898</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 gap-4">
            <div>© {new Date().getFullYear()} FastFun Remote. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">Compliance</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
