'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/components/product/ProductComparison';

interface ComparisonContextType {
  selectedProducts: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isProductSelected: (productId: string) => boolean;
  maxProducts: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const maxProducts = 4; // Maximum 4 products for comparison

  const addToComparison = (product: Product) => {
    setSelectedProducts(prev => {
      // Check if product is already selected
      if (prev.some(p => p.id === product.id)) {
        return prev;
      }
      
      // Check if we've reached the maximum
      if (prev.length >= maxProducts) {
        // Replace the first product
        return [...prev.slice(1), product];
      }
      
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setSelectedProducts([]);
  };

  const isProductSelected = (productId: string) => {
    return selectedProducts.some(p => p.id === productId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedProducts,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isProductSelected,
        maxProducts
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}