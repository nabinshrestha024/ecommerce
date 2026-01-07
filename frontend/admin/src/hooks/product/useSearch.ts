"use client";

import type { ProductData } from "@/components/Category/CategoryTable";
import { searchProduct } from "@/lib/product/getSearchProduct";
import { useQuery } from "@tanstack/react-query";

type ProductResponse = {
  items: ProductData[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useSearch = (name: string, pageIndex: number) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["productData", name],
    queryFn: () => searchProduct(name, pageIndex),
  });
  return { data, isLoading, isError, refetch };
};
