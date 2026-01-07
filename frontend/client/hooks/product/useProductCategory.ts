"use client";
import { ProductType } from "@/components/Product/ProductDisplay";
import { ProductByCategory } from "@/lib/product/getProductCategory";
import { useQuery } from "@tanstack/react-query";

type ProductResponse = {
  items: ProductType[];
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
