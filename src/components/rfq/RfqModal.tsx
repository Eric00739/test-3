'use client';

import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export interface RfqModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (mailtoUrl: string) => void;
  onDownloadTemplate: () => void;
}

const PROTOCOL_OPTIONS = ['433 MHz ASK', '433 MHz FSK', '868 MHz', '915 MHz', '2.4 GHz Wi-Fi', 'BLE'];
const KEY_LAYOUT_OPTIONS = ['2 buttons', '4 buttons', '6 buttons', 'Keypad', 'Custom'];
const CERTIFICATION_OPTIONS = ['CE RED', 'FCC Part 15', 'RoHS', 'REACH', 'UL'];
const LEAD_TIME_OPTIONS = ['7-10 days prototyping', '20-30 days mass production', 'Custom'];

export function RfqModal({ open, onClose, onSubmit, onDownloadTemplate }: RfqModalProps) {
  const defaultMailto = useMemo(() => {
    const params = new URLSearchParams({
      subject: 'RFQ: Custom RF Remote / IoT Module',
      body: [
        'Hi FastFunRC team,',
        '',
        'We would like to request a quotation with the following details:',
        '- Email:',
        '- Country / Region:',
        '- Required quantity:',
        '- Protocol / Frequency:',
        '- Key layout / Housing:',
        '- Certification needs:',
        '- Desired delivery timeline:',
        '',
        'Please also share available datasheets and MOQ. Thank you!',
      ].join('%0D%0A'),
    });
    return `mailto:eric@fastfunrc.com?${params.toString()}`;
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-900/70"
            onClick={onClose}
            aria-label="Close RFQ overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Request a custom quotation"
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-10 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <header className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Get Your RFQ in 24 Hours</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Provide the essentials below (7 fields). We reply with MOQ, tooling, certificate checklist, and lead time.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close RFQ panel"
                className="text-2xl leading-none text-slate-400 transition-colors hover:text-slate-600"
              >
                &times;
              </button>
            </header>

            <form
              className="space-y-6"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const mailtoUrl = buildMailto(formData, defaultMailto);
                onSubmit(mailtoUrl);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" description="Work email for quote follow-up" required>
                  <Input name="email" type="email" placeholder="engineer@brand.com" required autoFocus aria-required="true" />
                </Field>
                <Field label="Country / Region" required>
                  <Input name="country" placeholder="e.g. Germany" required />
                </Field>
                <Field label="Required quantity" required>
                  <Input name="quantity" placeholder="Annual qty or pilot batch" required />
                </Field>
                <Field label="Protocol / Frequency" required>
                  <NativeSelect name="protocol" defaultValue={PROTOCOL_OPTIONS[0]}>
                    {PROTOCOL_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label="Key layout / Housing" required>
                  <NativeSelect name="keys" defaultValue={KEY_LAYOUT_OPTIONS[0]}>
                    {KEY_LAYOUT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label="Certification needs" required>
                  <NativeSelect name="cert" defaultValue={CERTIFICATION_OPTIONS[0]}>
                    {CERTIFICATION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label="Desired delivery timeline" required>
                  <NativeSelect name="timeline" defaultValue={LEAD_TIME_OPTIONS[0]}>
                    {LEAD_TIME_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label="Additional notes (optional)" description="Share key functions or attachments">
                  <Textarea
                    name="notes"
                    rows={3}
                    placeholder="Firmware, BOM, certification files, MOQ expectations..."
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" className="bg-orange-500 px-6 py-3 text-white hover:bg-orange-600">
                  <Send className="mr-2 h-4 w-4" />
                  Submit & email RFQ
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-50"
                  onClick={onDownloadTemplate}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download prototyping checklist
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-green-600"
                  onClick={() => onSubmit('https://wa.me/8615899648898')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Talk on WhatsApp
                </Button>
              </div>
            </form>

            <Card className="mt-6 border-slate-200 bg-slate-50">
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>
                  FastFunRC handles tooling, PCBA, RF tuning, and certifications in-house. Typical RFQ response time: within 12 hours on business days.
                </p>
                <p>Need an NDA first? Attach your template via reply  -  we support bilingual agreements.</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
  description?: string;
  required?: boolean;
}

function Field({ label, children, description, required = false }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-600">
      <span className="font-medium text-slate-800">
        {label}
        {required && <span className="ml-1 text-orange-500">*</span>}
      </span>
      {description && <span className="text-xs text-slate-400">{description}</span>}
      {children}
    </label>
  );
}

interface NativeSelectProps {
  name: string;
  defaultValue?: string;
  children: React.ReactNode;
}

function NativeSelect({ name, defaultValue, children }: NativeSelectProps) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      required
      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
    >
      {children}
    </select>
  );
}

function buildMailto(formData: FormData, fallback: string) {
  const email = formData.get('email');
  if (!email) {
    return fallback;
  }

  const body = [
    `Email: ${email}`,
    `Country / Region: ${formData.get('country') ?? ''}`,
    `Required quantity: ${formData.get('quantity') ?? ''}`,
    `Protocol / Frequency: ${formData.get('protocol') ?? ''}`,
    `Key layout / Housing: ${formData.get('keys') ?? ''}`,
    `Certification needs: ${formData.get('cert') ?? ''}`,
    `Desired delivery timeline: ${formData.get('timeline') ?? ''}`,
    '',
    `Additional notes: ${formData.get('notes') ?? ''}`,
  ].join('\n');

  const params = new URLSearchParams({
    subject: 'RFQ: Custom RF Remote / IoT Module',
    body,
  });

  return `mailto:eric@fastfunrc.com?${params.toString()}`;
}