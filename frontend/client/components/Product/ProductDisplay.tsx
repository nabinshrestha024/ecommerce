"use client";

import { ProductCard } from "./ProductCard";
import { Category } from "./Category";
import { useSearchParams } from "next/navigation";
import { useProductCategory } from "@/hooks/product/useProductCategory";
import { useProduct } from "@/hooks/product/useProduct";
import { Variant, VariantAttributes } from "./ProductDetails";
import { ProductCardSkeleton } from "../TrendingProduct/component/ProductCardLoading";

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
  const prod = useProductCategory(categoryId || 0);
  const products = useProduct();
  const placeholderCount = 12;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col md:flex-row gap-5 items-start w-full">
      <Category />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-6">
        {products.isLoading &&
          Array.from({ length: placeholderCount }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

        {products.isError &&
          Array.from({ length: placeholderCount }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

        {categoryId === null
          ? (products.data?.items || []).map((product: Product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          : (prod.data?.items || []).map((product: Product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
      </div>
    </div>
  );
};
