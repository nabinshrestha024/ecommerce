"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

interface ImageType {
  productImageId: number;
  imageUrl: string;
  productId: number;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductType {
  productId: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: number;
  stockQuantity: number;
  primaryImageUrl: string;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
  sku: string;
  variants: Variant[] | undefined;
  availableAttributes?: VariantAttributes[];
  images: ImageType[];
  relatedProducts: ProductType[];
}

export const ProductDisplay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("categoryId");
  const categoryId = categoryParam ? Number(categoryParam) : null;
  const tagsParam = searchParams.get("tags");
  const tagsFromUrl = tagsParam ? tagsParam.split(",") : [];

  const [activeFilters, setActiveFilters] = useState<FilterFormValues | null>(
    null,
  );

  const prod = useProductCategory(categoryId || 0);
  const products = useProduct();
  const filteredProducts = useGetCatalogProduct({
    categoryId: categoryId || undefined,
    tagNames: activeFilters?.tags || tagsFromUrl,
    minPrice: activeFilters?.minPrice || undefined,
    maxPrice: activeFilters?.maxPrice || undefined,
  });

  const placeholderCount = 12;

  const handleFilterChange = (filters: FilterFormValues) => {
    setActiveFilters(filters);

    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) params.set("categoryId", categoryId.toString());

    if (filters.tags.length > 0) {
      params.set("tags", filters.tags.join(","));
    } else {
      params.delete("tags");
    }

    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice);
    } else {
      params.delete("minPrice");
    }

    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice);
    } else {
      params.delete("maxPrice");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const displayData =
    activeFilters || tagsFromUrl.length > 0 || categoryId !== null
      ? filteredProducts.data?.data?.items || []
      : products.data?.items || [];

  const isLoading =
    activeFilters || tagsFromUrl.length > 0 || categoryId !== null
      ? filteredProducts.isLoading
      : prod.isLoading;

  const isError =
    activeFilters || tagsFromUrl.length > 0 || categoryId !== null
      ? filteredProducts.isError
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

        {displayData.map((product: ProductType) => (
          <ProductCard key={product.productId} product={product} />
        ))}

        {!isLoading && !isError && displayData.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found matching your filters.
          </div>
        )}

        {categoryId === null
          ? (products.data?.items || []).map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          : (prod.data?.items || []).map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
      </div>
    </div>
  );
};
