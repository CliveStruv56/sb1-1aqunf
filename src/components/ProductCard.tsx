import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, milkOption?: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [showMilkOptions, setShowMilkOptions] = useState(false);

  const handleAddToCart = (milkOption?: string) => {
    onAddToCart(product, milkOption);
    setShowMilkOptions(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-xl font-semibold">{product.name}</h3>
          <p className="text-white/90 text-sm">${product.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        {product.allowsMilkOptions ? (
          <div className="space-y-2">
            {showMilkOptions ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {['whole', 'oat', 'almond', 'soy'].map((milk) => (
                    <button
                      key={milk}
                      onClick={() => handleAddToCart(milk)}
                      className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 
                               transition-colors capitalize"
                    >
                      {milk}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowMilkOptions(false)}
                  className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowMilkOptions(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium 
                         hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add to Cart
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart()}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium 
                     hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}