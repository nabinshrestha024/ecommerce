"use client";
import { useProduct } from "@/hooks/product/useProduct";
import { ProductCardSkeleton } from "./ProductCardLoading";
import { ProductCard } from "@/components/Product/ProductCard";

export interface WishlistItem {
  productId: number;
  wishlistId: number;
  variantId: number;
  primaryImageUrl: string;
  name: string;
  shortDescription: string;
  price: number;
  id: number;
}

export type wishlistData = number | undefined;

export const TrendingProductCard = () => {
  const { data, isLoading, isError } = useProduct();
  const placeholderCount = 3;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
      {isLoading &&
        Array.from({ length: placeholderCount }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}

      {isError &&
        Array.from({ length: placeholderCount }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}

      {data?.items?.map(
        (product, index) =>
          index < 3 && (
            <ProductCard key={product.productId} product={product} />
          ),
      )}
    </div>
  );
};
