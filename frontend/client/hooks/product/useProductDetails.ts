"use client";
import { ProductByCategory } from "@/lib/product/getProductCategory";
import { ProductDetails } from "@/lib/product/getProductDetails";
import { useQuery } from "@tanstack/react-query";

type ProductData = {
  productId: number;
  name: string;
  slug: string;
  price: number;
  categoryId: number;
  shortDescription: string;
  description: string;
  isActive: boolean;
  stockQuantity: number;
  sku: string;
  images: ProductImage[];
};

export interface ProductImage {
  id?: number;
  url: string;
  isPrimary?: boolean;
}

export const useProductDetails = (slug: string) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductData>({
    queryKey: ["product", slug],
    queryFn: () => ProductDetails(slug),
  });
  return { data, isLoading, isError, refetch };
};
