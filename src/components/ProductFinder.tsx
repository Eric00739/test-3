'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Filter, RefreshCcw, Sparkles } from 'lucide-react';

export interface ProductFinderProps {
  onQuote: (productName: string) => void;
  onTrack: (event: string, payload?: Record<string, unknown>) => void;
}

type FilterKey = 'protocol' | 'band' | 'keys' | 'housing' | 'cert' | 'application';

type Product = {
  id: string;
  name: string;
  description: string;
  protocol: string;
  band: string;
  keys: string;
  housing: string;
  cert: string;
  application: string;
  bullets: string[];
  datasheetUrl: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: 'remote-433-rolling',
    name: '433MHz Rolling Code Remote',
    description: '4-key ABS remote with rolling code firmware and IP65 sealing.',
    protocol: 'RF',
    band: '433 MHz',
    keys: '4 keys',
    housing: 'ABS IP65',
    cert: 'CE/FCC',
    application: 'Gate & Garage',
    bullets: ['<200 DPPM mass production', 'EV1527/PT2262 compatible', 'Custom logo tooling in 21 days'],
    datasheetUrl: '#remote-433-datasheet',
    image: '/assets/logo-512.png',
  },
  {
    id: 'remote-868-slim',
    name: '868MHz Slim Remote',
    description: 'Slim-line rolling code transmitter for EU smart home lines.',
    protocol: 'RF',
    band: '868 MHz',
    keys: '2 keys',
    housing: 'Aluminum',
    cert: 'CE RED',
    application: 'Smart Home',
    bullets: ['Machined aluminium bezel', 'ASK/FSK selectable', 'Custom Pantone finishing'],
    datasheetUrl: '#remote-868-datasheet',
    image: '/assets/logo-512.png',
  },
  {
    id: 'wifi-switch-tuya',
    name: 'Wi-Fi Smart Switch (Tuya)',
    description: '2.4GHz Wi-Fi switch module ready for Tuya/ESP firmware.',
    protocol: 'Wi-Fi',
    band: '2.4 GHz',
    keys: 'Touch pad',
    housing: 'PC V0',
    cert: 'CE/FCC/UL',
    application: 'Smart Lighting',
    bullets: ['Triac/relay options', 'UL94 V-0 enclosure', 'Cloud OTA ready'],
    datasheetUrl: '#wifi-switch-datasheet',
    image: '/assets/logo-512.png',
  },
  {
    id: 'ble-remote',
    name: 'BLE + RF Hybrid Remote',
    description: 'Dual BLE/RF remote for smart locker and access kits.',
    protocol: 'BLE + RF',
    band: '2.4 GHz',
    keys: 'Keypad',
    housing: 'Zinc alloy',
    cert: 'CE/FCC',
    application: 'Access Control',
    bullets: ['AES encrypted BLE link', 'Rechargeable Li-ion', 'Metal keypad with backlight'],
    datasheetUrl: '#ble-remote-datasheet',
    image: '/assets/logo-512.png',
  },
  {
    id: 'receiver-industrial',
    name: 'Industrial Receiver Module',
    description: '433/315 MHz superheterodyne receiver with 4-relay outputs.',
    protocol: 'RF',
    band: '433 MHz',
    keys: 'N/A',
    housing: 'Din rail',
    cert: 'CE/FCC',
    application: 'Industrial Automation',
    bullets: ['-110 dBm sensitivity', 'Din rail ready case', 'Conformal coated PCB'],
    datasheetUrl: '#receiver-datasheet',
    image: '/assets/logo-512.png',
  },
  {
    id: 'rf-module-oem',
    name: 'OEM RF Module + PCBA',
    description: 'Custom RF module with matched antenna tuning and PCBA services.',
    protocol: 'RF',
    band: '315 MHz',
    keys: 'OEM',
    housing: 'Bare PCB',
    cert: 'Customized',
    application: 'OEM Integration',
    bullets: ['ASK/FSK selectable', 'Auto antenna matching', 'Design to certification support'],
    datasheetUrl: '#rf-module-datasheet',
    image: '/assets/logo-512.png',
  },
];

const FILTER_LABELS: Record<FilterKey, string> = {
  protocol: 'Protocol',
  band: 'Band',
  keys: 'Keys',
  housing: 'Housing',
  cert: 'Certification',
  application: 'Application',
};

const ALL_VALUE = 'All';

export function ProductFinder({ onQuote, onTrack }: ProductFinderProps) {
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    protocol: ALL_VALUE,
    band: ALL_VALUE,
    keys: ALL_VALUE,
    housing: ALL_VALUE,
    cert: ALL_VALUE,
    application: ALL_VALUE,
  });

  const options = useMemo(() => {
    const base: Record<FilterKey, string[]> = {
      protocol: [],
      band: [],
      keys: [],
      housing: [],
      cert: [],
      application: [],
    };

    for (const product of PRODUCTS) {
      base.protocol.push(product.protocol);
      base.band.push(product.band);
      base.keys.push(product.keys);
      base.housing.push(product.housing);
      base.cert.push(product.cert);
      base.application.push(product.application);
    }

    return {
      protocol: buildOptions(base.protocol),
      band: buildOptions(base.band),
      keys: buildOptions(base.keys),
      housing: buildOptions(base.housing),
      cert: buildOptions(base.cert),
      application: buildOptions(base.application),
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const result = PRODUCTS.filter((product) => {
      return (Object.keys(filters) as FilterKey[]).every((key) => {
        const value = filters[key];
        return value === ALL_VALUE || product[key] === value;
      });
    });
    return result;
  }, [filters]);

  useEffect(() => {
    onTrack('finder_use', { action: 'filters_applied', filters });
  }, [filters, onTrack]);

  const handleChange = (key: FilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    onTrack('finder_use', { action: 'filter_change', key, value });
  };

  const resetFilters = () => {
    const reset = {
      protocol: ALL_VALUE,
      band: ALL_VALUE,
      keys: ALL_VALUE,
      housing: ALL_VALUE,
      cert: ALL_VALUE,
      application: ALL_VALUE,
    } as Record<FilterKey, string>;
    setFilters(reset);
    onTrack('finder_use', { action: 'filters_reset' });
  };

  return (
    <section id="finder" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow">
            <Sparkles className="h-4 w-4" />
            Product Finder
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Filter ready-to-build RF remotes, receivers, and IoT modules
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Choose the band, key layout, housing, and certification you need. Results update instantly.
          </p>
        </div>

        <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Filter className="h-5 w-5 text-orange-500" />
              Configure your target product
            </h3>
            <Button type="button" variant="ghost" size="sm" onClick={resetFilters} className="text-slate-600 hover:text-orange-600">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(filters) as FilterKey[]).map((key) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700" htmlFor={`finder-${key}`}>
                  {FILTER_LABELS[key]}
                </label>
                <select
                  id={`finder-${key}`}
                  name={key}
                  value={filters[key]}
                  onChange={(event) => handleChange(key, event.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                >
                  <option value={ALL_VALUE}>All</option>
                  {options[key].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex h-full flex-col">
              <CardContent className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-slate-600">{product.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                    {product.band}
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                    {product.housing}
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                    {product.cert}
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                    {product.application}
                  </Badge>
                </div>

                <ul className="space-y-1 text-sm text-slate-600">
                  {product.bullets.map((bullet) => (
                    <li key={bullet}>- {bullet}</li>
                  ))}
                </ul>

                <div className="mt-auto grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                    onClick={() => onTrack('finder_use', { action: 'datasheet_click', product: product.name })}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Datasheet
                  </Button>
                  <Button
                    type="button"
                    className="bg-orange-500 text-white hover:bg-orange-600"
                    onClick={() => {
                      onTrack('finder_use', { action: 'quote_click', product: product.name });
                      onQuote(product.name);
                    }}
                  >
                    Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              <p className="text-lg font-semibold text-gray-900">No matching products yet</p>
              <p className="mt-2 text-sm">
                Update the filters or send your requirements directly. Our engineers will match an existing platform or start a new design.
              </p>
              <Button type="button" className="mt-4 bg-orange-500 text-white hover:bg-orange-600" onClick={() => onQuote('Custom RFQ')}>
                Share project details
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function buildOptions(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}