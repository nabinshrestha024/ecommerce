"use client";
import { ProductByCategory } from "@/lib/product/getProductCategory";
import { useQuery } from "@tanstack/react-query";

type ProductData = {
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

export const useProductCategory = (categoryId: number) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["product", categoryId],
    queryFn: () => ProductByCategory(categoryId),
  });
  return { data, isLoading, isError, refetch };
};
