"use client";
import {
  Variant,
  VariantAttributes,
} from "@/components/Product/ProductDetails";
import { ProductDetails } from "@/lib/product/getProductDetails";
import { useQuery } from "@tanstack/react-query";

type ProductData = {
  productId: number;
  name: string;
  slug: string;
  price: number;
  categoryId: number;
  categoryName: string;
  shortDescription: string;
  description: string;
  isActive: boolean;
  stockQuantity: number;
  sku: string;
  images: ProductImage[];
  variants: Variant[];
  availableAttributes: VariantAttributes[];
};

export interface ProductImage {
  id?: number;
  imageUrl: string;
  isPrimary?: boolean;
}

export const useProductDetails = (slug: string) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductData>({
    queryKey: ["product", slug],
    queryFn: () => ProductDetails(slug),
  });
  return { data, isLoading, isError, refetch };
};
