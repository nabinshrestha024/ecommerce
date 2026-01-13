"use client";
import { fetchProduct } from "@/lib/product/fetchProduct";
import { useQuery } from "@tanstack/react-query";
export type VariantData = {
  variantId: number;
  stockQuantity: number;
  price: number;
  sku: string;
};

export type ProductData = {
  productId: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: number;
  description: string;
  stockQuantity: number;
  primaryImageUrl: string;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
  sku: string;
  variants: VariantData[];
  relatedProducts: ProductData[];
};

type ProductResponse = {
  items: ProductData[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useFetchProduct = () => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["productData"],
    queryFn: fetchProduct,
  });
  return { data, isLoading, isError, refetch };
};
