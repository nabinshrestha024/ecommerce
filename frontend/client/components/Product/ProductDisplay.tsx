"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Category } from "./Category";
import { useSearchParams } from "next/navigation";
import { useProductCategory } from "@/hooks/product/useProductCategory";
import { useProduct } from "@/hooks/product/useProduct";
import { useGetCatalogProduct } from "@/hooks/filter/useGetCatalogProduct";
import { Variant, VariantAttributes } from "./ProductDetails";
import { ProductCardSkeleton } from "../TrendingProduct/component/ProductCardLoading";
import { Filter } from "./Filter";

type FilterFormValues = {
  minPrice: string;
  maxPrice: string;
  tags: string[];
};

interface Product {
  productId: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: number;
  stockQuantity: number;
  primaryImageUrl: string;
  isActive: boolean;
  categoryId: number;
  sku: string;
  variants?: Variant[];
  availableAttributes?: VariantAttributes[];
}

export const ProductDisplay = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("categoryId");
  const categoryId = categoryParam ? Number(categoryParam) : null;

  const [activeFilters, setActiveFilters] = useState<FilterFormValues | null>(
    null,
  );

  const prod = useProductCategory(categoryId || 0);
  const products = useProduct();
  const filteredProducts = useGetCatalogProduct({
    tagNames: activeFilters?.tags || [],
    minPrice: activeFilters?.minPrice || undefined,
    maxPrice: activeFilters?.maxPrice || undefined,
  });

  const placeholderCount = 12;

  const handleFilterChange = (filters: FilterFormValues) => {
    setActiveFilters(filters);
  };

  const displayData = activeFilters
    ? filteredProducts.data?.data?.items || []
    : categoryId === null
      ? products.data?.items || []
      : prod.data?.items || [];

  const isLoading = activeFilters
    ? filteredProducts.isLoading
    : categoryId === null
      ? products.isLoading
      : prod.isLoading;

  const isError = activeFilters
    ? filteredProducts.isError
    : categoryId === null
      ? products.isError
      : prod.isError;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col md:flex-row gap-5 items-start w-full">
      <div className="flex flex-col gap-5">
        <Category />
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-6">
        {isLoading &&
          Array.from({ length: placeholderCount }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

        {isError &&
          Array.from({ length: placeholderCount }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

        {displayData.map((product: Product) => (
          <ProductCard key={product.productId} product={product} />
        ))}

        {!isLoading && !isError && displayData.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};
