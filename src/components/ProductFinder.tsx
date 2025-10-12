'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Radio, Wifi, Package, Car, Zap, Shield, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface ProductFinderProps {
  onQuote: (productName: string) => void;
  onTrack: (event: string, payload?: Record<string, unknown>) => void;
}

const PRODUCT_CATEGORIES = [
  {
    id: 'rf-remote',
    title: 'RF Remote',
    description: 'High-performance wireless remote controls with advanced encryption',
    icon: Radio,
    color: 'from-blue-500 to-blue-600',
    features: ['Multi-frequency support', 'Rolling code encryption', 'Custom branding options']
  },
  {
    id: 'rf-receiver',
    title: 'RF Receiver',
    description: 'Professional-grade receivers with superior sensitivity and reliability',
    icon: Wifi,
    color: 'from-green-500 to-green-600',
    features: ['Superheterodyne design', 'Multi-channel support', 'Easy integration']
  },
  {
    id: 'rf-kits',
    title: 'RF Kits',
    description: 'Complete transmitter and receiver combinations for quick deployment',
    icon: Package,
    color: 'from-purple-500 to-purple-600',
    features: ['Pre-paired sets', 'Multiple configurations', 'Technical support included']
  },
  {
    id: 'car-remote',
    title: 'Car Remotes',
    description: 'Automotive security solutions with immobilizer compatibility',
    icon: Car,
    color: 'from-red-500 to-red-600',
    features: ['Immobilizer compatible', 'Advanced functions', 'Durable design']
  },
  {
    id: 'wifi-switch',
    title: 'Wifi Switch',
    description: 'Smart home control with app and voice command integration',
    icon: Zap,
    color: 'from-orange-500 to-orange-600',
    features: ['App control', 'Voice integration', 'Energy monitoring']
  },
  {
    id: 'wifi-socket',
    title: 'Wifi Socket',
    description: 'Intelligent power control with remote operation and scheduling',
    icon: Shield,
    color: 'from-cyan-500 to-cyan-600',
    features: ['Remote control', 'Smart scheduling', 'Safety features']
  },
  {
    id: 'others',
    title: 'Others',
    description: 'Specialized solutions including infrared beams and custom modules',
    icon: Shield,
    color: 'from-indigo-500 to-indigo-600',
    features: ['Custom development', 'Specialized protocols', 'Full certification support']
  }
];

export function ProductFinder({ onQuote, onTrack }: ProductFinderProps) {
  useEffect(() => {
    onTrack('finder_view');
  }, [onTrack]);

  const handleCategoryClick = (categoryId: string) => {
    onTrack('finder_category_click', { category: categoryId });
    onQuote(`Product inquiry: ${categoryId}`);
  };

  return (
    <section id="finder" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow">
            <Sparkles className="h-4 w-4" />
            Product Categories
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Main Product Categories
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Explore our comprehensive range of wireless control solutions. For detailed specifications, visit our Products page.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCT_CATEGORIES.map((category) => (
            <Card key={category.id} className="group h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${category.color}`} />
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mr-4`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>

                <p className="text-slate-600 mb-4 leading-relaxed">{category.description}</p>

                <ul className="space-y-2 mb-6">
                  {category.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <Link
                    href="/products"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
                    onClick={() => onTrack('finder_details_click', { category: category.id })}
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    Get Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Need a customized solution not listed here? Our engineering team can develop specialized products to meet your exact requirements.
          </p>
          <Button
            className="bg-slate-800 hover:bg-slate-900 text-white"
            onClick={() => {
              onTrack('finder_custom_click');
              onQuote('Custom product inquiry');
            }}
          >
            Discuss Custom Requirements
          </Button>
        </div>
      </div>
    </section>
  );
}