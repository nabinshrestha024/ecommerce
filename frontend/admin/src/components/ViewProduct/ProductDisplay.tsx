"use client";

import { ProductCard } from "./ProductCard";
import { products } from "./ProductData.import";
import { Category } from "./Categories";
import { useEffect, useMemo, useState } from "react";

export const ProductDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
  }, [selectedCategory]);

  const filteredData = useMemo(() => {
    if (selectedCategory === "All") return products;

    return products.filter(
      (product) => product.category === selectedCategory.toLowerCase(),
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex gap-5 items-start">
      <Category
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
