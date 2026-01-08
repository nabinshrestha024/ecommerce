"use client";
import {
  Variant,
  VariantAttributes,
} from "@/components/Product/ProductDetails";
import { ProductType } from "@/components/Product/ProductDisplay";
import { ProductDetails } from "@/lib/product/getProductDetails";
import { useQuery } from "@tanstack/react-query";

export type ProductData = {
  productId: number;
  name: string;
  slug: string;
  price: number;
  categoryId: number;
  categoryName: string;
  shortDescription: string | null;
  description: string;
  isActive: boolean;
  stockQuantity: number;
  sku: string;
  primaryImageUrl: string;
  images: ProductImage[];
  variants: Variant[] | undefined;
  availableAttributes: VariantAttributes[];
  relatedProducts: ProductData[];
};

export interface ProductImage {
  id?: number;
  imageUrl: string;
  isPrimary?: boolean;
}

export const useProductDetails = (slug: string) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductType>({
    queryKey: ["product", slug],
    queryFn: () => ProductDetails(slug),
  });
  return { data, isLoading, isError, refetch };
};
