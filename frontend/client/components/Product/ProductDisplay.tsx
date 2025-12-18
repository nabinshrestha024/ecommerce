"use client";

import { ProductCard } from "./ProductCard";
import { products, ProductType } from "./Product.import";
import { Category } from "./Category";
import { useState } from "react";

export const ProductDisplay = ({ category }: { category: string }) => {
  const [filteredData] = useState<ProductType[]>(() => {
    if (!category) {
      return products;
    } else {
      return products.filter((val) => val.category === category);
    }
  });
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex gap-5 items-start">
      <Category />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
