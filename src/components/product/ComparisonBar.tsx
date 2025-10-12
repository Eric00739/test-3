'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, BarChart3, ArrowUp } from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import { ProductComparison } from './ProductComparison';
import type { Product } from './ProductComparison';

export function ComparisonBar() {
  const { selectedProducts, removeFromComparison, clearComparison } = useComparison();
  const [isExpanded, setIsExpanded] = useState(false);

  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <>
      {/* Comparison Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  <span className="font-medium text-gray-900">
                    Compare {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''}
                  </span>
                </div>
                
                {/* Selected Products */}
                <div className="hidden md:flex items-center gap-2">
                  {selectedProducts.map((product) => (
                    <Badge
                      key={product.id}
                      variant="secondary"
                      className="pr-1 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      {product.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1 hover:bg-transparent"
                        onClick={() => removeFromComparison(product.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:flex"
                >
                  {isExpanded ? (
                    <>
                      <ArrowUp className="h-4 w-4 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-1" />
                      View Comparison
                    </>
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearComparison}
                  className="text-slate-500 hover:text-slate-700"
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            {/* Mobile Product List */}
            <div className="md:hidden mt-2 flex flex-wrap gap-1">
              {selectedProducts.map((product) => (
                <Badge
                  key={product.id}
                  variant="secondary"
                  className="pr-1 bg-slate-100 text-slate-700 text-xs"
                >
                  {product.name.length > 15 ? `${product.name.substring(0, 15)}...` : product.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => removeFromComparison(product.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Comparison View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 left-0 right-0 z-30 bg-white border-t shadow-2xl overflow-hidden"
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Comparison</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Close
                </Button>
              </div>
              
              <ProductComparison
                products={selectedProducts}
                onRemoveProduct={removeFromComparison}
                onClearAll={clearComparison}
                onQuote={(productNames) => {
                  // Handle quote request
                  console.log('Quote requested for:', productNames);
                  // You can integrate with RFQ modal here
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from being hidden behind the bar */}
      <div className="h-16"></div>
    </>
  );
}