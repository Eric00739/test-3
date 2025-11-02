'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  MessageCircle,
  Send,
  Upload,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RFQ_MAILTO_EMAIL } from '@/config/rfq-config';

export interface RfqModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (result: {
    status: 'success' | 'error' | 'whatsapp' | 'mailto';
    message?: string;
    data?: any;
  }) => void;
  source?: string;
}

const DEFAULT_MESSAGE =
  "Hi FastFunRC team,\n\nI'm interested in your wireless control solutions. Please send me a quote and any recommendations you have.\n\nThank you!";

const QUANTITY_OPTIONS = [
  { value: '', label: 'Select quantity tier' },
  { value: 'sample', label: 'Sample (1-10)' },
  { value: 'small', label: 'Small batch (50-200)' },
  { value: 'medium', label: 'Medium batch (200-500)' },
  { value: 'large', label: 'Large batch (500+)' },
];

const PRODUCT_TYPE_OPTIONS = [
  { value: '', label: 'Select product type' },
  { value: 'inStock', label: 'In-stock / replacement' },
  { value: 'config', label: 'Configurable setup' },
  { value: 'custom', label: 'Custom development' },
];

const BAND_OPTIONS = [
  { value: '', label: 'Select frequency band' },
  { value: '315', label: '315 MHz' },
  { value: '433', label: '433.92 MHz' },
  { value: '446', label: '446 MHz' },
  { value: '447', label: '447 MHz' },
  { value: '868', label: '868 MHz' },
  { value: '915', label: '915 MHz' },
];

export function RfqModal({ open, onClose, onSubmit, source = 'default' }: RfqModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [country, setCountry] = useState('');
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [band, setBand] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [moreDetailsOpen, setMoreDetailsOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [ticketId, setTicketId] = useState('');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const savedEmail = localStorage.getItem('rfq_email');
      const savedName = localStorage.getItem('rfq_name');

      if (savedEmail) setEmail(savedEmail);
      if (savedName) setName(savedName);
      if (!message.trim()) setMessage(DEFAULT_MESSAGE);

      setTimeout(() => emailInputRef.current?.focus(), 120);
    } else {
      resetForm();
    }
  }, [open]);

  useEffect(() => {
    if (email) localStorage.setItem('rfq_email', email);
    if (name) localStorage.setItem('rfq_name', name);
  }, [email, name]);

  const extractNameFromEmail = (value: string) => {
    if (!value.includes('@')) return '';
    const localPart = value.split('@')[0];

    return localPart
      .replace(/[._-]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError('');

    if (value.includes('@') && !name.trim()) {
      const suggested = extractNameFromEmail(value);
      if (suggested.length > 2) setName(suggested);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError('');
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setMessage(DEFAULT_MESSAGE);
    setCountry('');
    setProductType('');
    setQuantity('');
    setBand('');
    setAttachedFiles([]);
    setMoreDetailsOpen(false);
    setEmailError('');
    setNameError('');
    setSubmitError('');
    setIsSubmitting(false);
    setIsSubmitted(false);
    setTicketId('');
  };

  const handleSubmit = async () => {
    const now = Date.now();
    if (now - lastSubmitTime < 8000) return;

    setSubmitError('');

    let hasError = false;
    if (!validateEmail(email)) {
      setEmailError('Enter a valid email.');
      hasError = true;
    }

    if (!name.trim()) {
      setNameError('Please add your name.');
      hasError = true;
    }

    if (hasError) return;
    if (honeypotRef.current?.value) return;

    setIsSubmitting(true);
    setLastSubmitTime(now);

    const newTicketId = `FF-${Date.now().toString().slice(-8)}`;
    setTicketId(newTicketId);

    const optionalLines = [
      country && `Country: ${country}`,
      productType && `Product Type: ${productType}`,
      quantity && `Quantity: ${quantity}`,
      band && `Frequency Band: ${band}`,
      source && source !== 'default' ? `Source: ${source}` : '',
    ].filter(Boolean);

    const composedMessage = [
      message.trim() || '(No additional details provided.)',
      '',
      '---',
      `Ticket ID: ${newTicketId}`,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      ...optionalLines,
    ].join('\n');

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      if (country.trim()) formData.append('country', country.trim());
      formData.append('message', composedMessage);
      formData.append('source', source);

      attachedFiles.forEach((file) => formData.append('attachments', file));

      const response = await fetch('/api/rfq', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onSubmit({
          status: 'success',
          message:
            result.message ||
            "Thanks! Your request has been sent. We'll reply within 24 hours.",
          data: { ticketId: newTicketId },
        });

        setIsSubmitted(true);
        setIsSubmitting(false);

        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
        }, 3200);
      } else if (result.fallback) {
        const body = [
          'Hi FastFunRC team,',
          '',
          "I'd like to request a quotation for your wireless control solutions.",
          '',
          `Ticket ID: ${newTicketId}`,
          `Name: ${name.trim()}`,
          `Email: ${email.trim()}`,
          country && `Country: ${country.trim()}`,
          productType && `Product Type: ${productType}`,
          quantity && `Quantity: ${quantity}`,
          band && `Frequency Band: ${band}`,
          '',
          message.trim(),
          '',
          'Please send me your product catalog and current pricing information.',
          '',
          'Thank you!',
        ]
          .filter(Boolean)
          .join('\n');

        const params = new URLSearchParams({
          subject: `RFQ received - Ticket ${newTicketId}`,
          body,
        });

        const mailtoUrl = `mailto:${RFQ_MAILTO_EMAIL}?${params.toString()}`;

        onSubmit({
          status: 'mailto',
          message:
            result.message ||
            'Server email services are unavailable. Opening your email client...',
          data: { mailtoUrl, ticketId: newTicketId },
        });

        setIsSubmitted(true);
        setIsSubmitting(false);

        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          window.location.href = mailtoUrl;
        }, 1500);
      } else {
        throw new Error(result.error || 'Failed to submit RFQ.');
      }
    } catch (error) {
      console.error('RFQ submission error:', error);
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit RFQ. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              onClick={onClose}
              aria-label="Close RFQ form"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-6 pt-6 pb-4">
              <header className="mb-4">
                <h2 className="text-2xl font-semibold text-slate-900">Get a Fast Quote</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Share your contact info and what you need. Our engineers will reply within 24 hours.
                </p>
              </header>

              <input
                ref={honeypotRef}
                type="text"
                name="website"
                className="sr-only"
                tabIndex={-1}
                autoComplete="off"
              />

              {!isSubmitted ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Work email <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={emailError ? 'border-red-500' : ''}
                    />
                    {emailError && (
                      <p className="mt-1 text-xs text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {emailError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Your name <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      autoComplete="name"
                      onChange={handleNameChange}
                      placeholder="John Smith"
                      className={nameError ? 'border-red-500' : ''}
                    />
                    {nameError && (
                      <p className="mt-1 text-xs text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {nameError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Project details
                    </label>
                    <Textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={5}
                      placeholder="Tell us about your application, target quantity, timeline, and any special requirements."
                    />
                  </div>

                  <div className="border border-slate-200 rounded-lg">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      onClick={() => setMoreDetailsOpen((prev) => !prev)}
                    >
                      <span>Add more details (optional)</span>
                      {moreDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    <AnimatePresence initial={false}>
                      {moreDetailsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-3 border-t border-slate-200 px-4 py-3"
                        >
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Country / Region</label>
                            <Input
                              value={country}
                              onChange={(event) => setCountry(event.target.value)}
                              placeholder="Where should we ship?"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Quantity tier</label>
                            <select
                              value={quantity}
                              onChange={(event) => setQuantity(event.target.value)}
                              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            >
                              {QUANTITY_OPTIONS.map((option) => (
                                <option key={option.value || 'default-quantity'} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Product type</label>
                            <select
                              value={productType}
                              onChange={(event) => setProductType(event.target.value)}
                              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            >
                              {PRODUCT_TYPE_OPTIONS.map((option) => (
                                <option key={option.value || 'default-product'} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Frequency band</label>
                            <select
                              value={band}
                              onChange={(event) => setBand(event.target.value)}
                              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            >
                              {BAND_OPTIONS.map((option) => (
                                <option key={option.value || 'default-band'} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Attach files (optional)
                    </label>
                    <div className="rounded-lg border-2 border-dashed border-slate-300 p-4 text-center transition-colors hover:border-orange-400">
                      <input
                        id="rfq-file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(event) => {
                          const files = Array.from(event.target.files || []);
                          setAttachedFiles((prev) => [...prev, ...files]);
                          event.target.value = '';
                        }}
                      />
                      <label htmlFor="rfq-file-upload" className="cursor-pointer">
                        <Upload className="mx-auto mb-2 h-8 w-8 text-slate-400" />
                        <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                        <p className="mt-1 text-xs text-slate-500">PDF, DOC, DWG, STEP files (max 10MB total)</p>
                      </label>
                    </div>

                    {attachedFiles.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {attachedFiles.map((file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-xs"
                          >
                            <span className="mr-2 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => setAttachedFiles((prev) => prev.filter((_, idx) => idx !== index))}
                              className="text-red-500 hover:text-red-700"
                              aria-label={`Remove ${file.name}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                      <p className="text-sm text-red-700">{submitError}</p>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="mt-4 w-full bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send request
                      </>
                    )}
                  </Button>

                  <div className="mt-4 text-center">
                    <p className="mb-2 text-xs text-slate-500">
                      Prefer WhatsApp? Reply to our confirmation email or message us directly.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onSubmit({
                          status: 'whatsapp',
                          message: 'User prefers WhatsApp communication',
                        })
                      }
                      className="text-xs font-medium text-green-600 hover:text-green-700"
                    >
                      <MessageCircle className="mr-1 inline h-3 w-3" />
                      Chat on WhatsApp
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Request sent successfully</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Thanks! Your request has been sent. We&apos;ll reply within 24 hours.
                  </p>
                  {ticketId && (
                    <p className="mt-1 text-xs text-slate-500">Ticket ID: {ticketId}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
