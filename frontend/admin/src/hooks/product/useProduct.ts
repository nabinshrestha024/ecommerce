"use client";

import { ProductTable } from "@/lib/product/getProduct";
import { useQuery } from "@tanstack/react-query";

export interface ProductResponse {
  items: ProductRes[];
  totalCount: number;
}
export interface ProductRes {
  productId: number;
  categoryId: number;
  categoryName: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  hasVariants: boolean;
  isActive: boolean;
  primaryImageUrl: string | null;
  price: number;
  stockQuantity: number;
  variants: ProductVariant[];
  images: ProductImage[];
  availableAttributes: AvailableAttribute[];
  tags: ProductTag[];
  primaryIndex: number;
}
export interface ProductVariant {
  variantId: number;
  sku: string;
  price: number;
  stockQuantity: number;
  isDefault: boolean;
  isActive: boolean;
  attributes: Record<string, string>;
}
export interface ProductImage {
  productImageId: number;
  imageUrl: string;
  productId: number;
  isPrimary: boolean;
  sortOrder: number;
}
export interface AvailableAttribute {
  name: string;
  values: string[];
}
export interface ProductTag {
  tagId: number;
  name: string;
}

export const useProduct = (pageIndex: number) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["productData", pageIndex],
    queryFn: () => ProductTable(pageIndex),
  });
  return { data, isLoading, isError, refetch };
};
