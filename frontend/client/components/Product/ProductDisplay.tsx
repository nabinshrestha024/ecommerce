"use client";

import { ProductCard } from "./ProductCard";
import { Category } from "./Category";
import { useSearchParams } from "next/navigation";
import { useProductCategory } from "@/hooks/product/useProductCategory";
import { useProduct } from "@/hooks/product/useProduct";

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
}

export const ProductDisplay = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("categoryId");
  const categoryId = categoryParam ? Number(categoryParam) : null;
  const prod = useProductCategory(categoryId || 0);
  const products = useProduct();
  if (products.isLoading) return <p>Loading products...</p>;
  if (products.isError) return <p>Failed to load products</p>;
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col md:flex-row gap-5 items-start w-[calc(100vw-16px)]">
      <Category />
      <div className="grid grid-cols-2 mx-auto md:grid-cols-2 lg:grid-cols-4 gap-6">
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
