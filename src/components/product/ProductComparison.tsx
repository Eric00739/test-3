'use client';

import { RFQ_MAILTO_EMAIL } from '@/config/rfq-config';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Check, Download, Share2, ArrowRight, Wifi, Radio, Zap, Package, Settings } from 'lucide-react';

// Product type definition
export type Product = {
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
  specs?: string;
  features?: string[];
  useCase?: string;
  color?: string;
  details?: string;
};

interface ProductComparisonProps {
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onQuote: (productNames: string[]) => void;
}

export function ProductComparison({ 
  products, 
  onRemoveProduct, 
  onClearAll, 
  onQuote 
}: ProductComparisonProps) {
  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [activeTab, setActiveTab] = useState<'technical' | 'physical' | 'certifications'>('technical');

  // Define comparison categories
  const comparisonCategories = {
    technical: [
      { key: 'protocol', label: 'Protocol' },
      { key: 'band', label: 'Frequency Band' },
      { key: 'keys', label: 'Keys/Controls' },
      { key: 'application', label: 'Primary Application' },
    ],
    physical: [
      { key: 'housing', label: 'Housing Material' },
      { key: 'specs', label: 'Specifications' },
      { key: 'details', label: 'Technical Details' },
    ],
    certifications: [
      { key: 'cert', label: 'Certifications' },
    ]
  };

  // Check if a value is different across products
  const isDifferentValue = (key: string) => {
    if (products.length < 2) return false;
    const values = products.map(p => p[key as keyof Product]);
    const firstValue = values[0];
    return values.some(v => v !== firstValue);
  };

  // Get unique values for a property
  const getUniqueValues = (key: string) => {
    const values = products.map(p => p[key as keyof Product]).filter(Boolean);
    return Array.from(new Set(values));
  };

  // Export comparison as text
  const exportComparison = () => {
    let text = 'Product Comparison Report\n';
    text += '=' .repeat(50) + '\n\n';
    
    products.forEach((product, index) => {
      text += `${index + 1}. ${product.name}\n`;
      text += `   Description: ${product.description}\n`;
      text += `   Protocol: ${product.protocol}\n`;
      text += `   Band: ${product.band}\n`;
      text += `   Keys: ${product.keys}\n`;
      text += `   Housing: ${product.housing}\n`;
      text += `   Certification: ${product.cert}\n`;
      text += `   Application: ${product.application}\n`;
      if (product.specs) text += `   Specs: ${product.specs}\n`;
      text += '\n';
    });

    // Create and download file
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-comparison.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Share comparison via email
  const shareComparison = () => {
    const subject = 'Product Comparison from FastFun Remote';
    const body = `I'm comparing these products from FastFun Remote:\n\n${products.map(p => `- ${p.name}: ${p.description}`).join('\n')}\n\nPlease help me choose the right one.`;
    window.location.href = `mailto:${RFQ_MAILTO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (products.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-slate-500">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No products selected for comparison</p>
          <p className="text-sm">Add products to compare their specifications side by side</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Product Comparison</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={highlightDifferences ? 'bg-orange-50 border-orange-200 text-orange-700' : ''}
            >
              Highlight Differences
            </Button>
            <Button variant="outline" size="sm" onClick={exportComparison}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={shareComparison}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
          </div>
        </div>

        {/* Product Cards Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {products.map((product) => (
            <Card key={product.id} className="relative overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 h-6 w-6 p-0 rounded-full bg-white/80 hover:bg-white"
                onClick={() => onRemoveProduct(product.id)}
              >
                <X className="h-3 w-3" />
              </Button>
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${product.color || 'from-blue-500 to-blue-600'} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  {product.protocol.includes('Wi-Fi') && <Wifi className="h-6 w-6 text-white" />}
                  {product.protocol.includes('RF') && <Radio className="h-6 w-6 text-white" />}
                  {product.protocol.includes('BLE') && <Settings className="h-6 w-6 text-white" />}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          {Object.keys(comparisonCategories).map((category) => (
            <Button
              key={category}
              variant={activeTab === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(category as any)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left p-4 font-medium text-slate-700 w-1/4">Specification</th>
                  {products.map((product) => (
                    <th key={product.id} className="text-left p-4 font-medium text-slate-900">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonCategories[activeTab as keyof typeof comparisonCategories].map(({ key, label }) => {
                  const isDifferent = highlightDifferences && isDifferentValue(key);
                  return (
                    <tr key={key} className={`border-b ${isDifferent ? 'bg-orange-50' : ''}`}>
                      <td className={`p-4 font-medium ${isDifferent ? 'text-orange-700' : 'text-slate-700'}`}>
                        {label}
                        {isDifferent && (
                          <Badge variant="outline" className="ml-2 text-xs bg-orange-100 border-orange-200 text-orange-700">
                            Different
                          </Badge>
                        )}
                      </td>
                      {products.map((product) => {
                        const value = product[key as keyof Product];
                        return (
                          <td key={product.id} className={`p-4 ${isDifferent ? 'text-orange-900 font-medium' : 'text-slate-900'}`}>
                            {value || '-'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Features Comparison */}
          <div className="border-t p-4">
            <h4 className="font-medium text-slate-700 mb-3">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id}>
                  <ul className="space-y-1">
                    {(product.features || product.bullets || []).slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-slate-600">
                        <Check className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t p-4 bg-slate-50">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <p className="text-sm text-slate-600">
                Comparing {products.length} product{products.length > 1 ? 's' : ''}
              </p>
              <Button
                onClick={() => onQuote(products.map(p => p.name))}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Get Quote for Selected Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
