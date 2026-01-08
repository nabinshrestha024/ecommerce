"use client";
import { Product } from "@/lib/product/FetchProductFunction";
import { useQuery } from "@tanstack/react-query";

export type ProductData = {
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
    queryFn: Product,
  });
  return { data, isLoading, isError, refetch };
};
