'use client'

import { MessageCircle, Package, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface MobileActionBarProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
}

export function MobileActionBar({ onOpenRfq, onWhatsApp }: MobileActionBarProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 md:hidden z-40 shadow-lg"
      aria-label="Mobile quick actions"
    >
      <ul className="flex items-center justify-around gap-2">
        <li>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center border-slate-300 text-slate-700 hover:bg-slate-50"
            onClick={() => onWhatsApp('mobile_bar')}
            aria-label="Open WhatsApp chat"
          >
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
            WhatsApp
          </Button>
        </li>
        <li>
          <Button
            size="sm"
            className="flex items-center bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => onOpenRfq('mobile_samples')}
            aria-label="Request product samples"
          >
            <Package className="mr-2 h-4 w-4" aria-hidden="true" />
            Samples
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center border-slate-300 text-slate-700 hover:bg-slate-50"
            onClick={() => onOpenRfq('mobile_catalog')}
            aria-label="Download catalog"
          >
            <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            Catalog
          </Button>
        </li>
      </ul>
    </nav>
  )
}
