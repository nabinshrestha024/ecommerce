"use client";

import { Category } from "./Categories";
import { useEffect, useState } from "react";
import { useFetchProduct } from "@/hooks/product/useFetchProducts";
import { useFetchCategory } from "@/hooks/category/useFetchCategory";
import { ProductCard } from "./ProductCard";

export const ProductDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
  }, [selectedCategory]);

  const products = useFetchProduct();
  const categories = useFetchCategory();
  if (products.isLoading) return <p>Loading products...</p>;
  if (products.isError) return <p>Failed to load products</p>;
  if (categories.isLoading) return <p>Loading categories...</p>;
  if (categories.isError) return <p>Failed to load categories</p>;

  const productsList = products.data?.items;
  const categoriesList = categories.data;

  const filteredData = (() => {
    if (selectedCategory === "All") return productsList;
    const matched = categoriesList?.find(
      (item) => item.name?.toLowerCase() === selectedCategory.toLowerCase(),
    );
    if (!matched) return productsList;
    const categoryId = matched.categoryId;
    return productsList?.filter((product) => product.categoryId === categoryId);
  })();

  return (
    <div className="min-h-screen p-8 flex gap-5 items-start">
      <Category
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredData?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};
