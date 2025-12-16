"use client";

import { ProductCard } from "./ProductCard";
import { products } from "./Product.import";

export const ProductDisplay: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
