"use client";

import { useQuery } from "@tanstack/react-query";
import type { ProductResponse } from "./useProduct";
import { filterProduct } from "@/lib/product/getFilterCategory";

export const useFilter = (name: string, pageIndex: number) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["productData", name],
    queryFn: () => filterProduct(name, pageIndex),
  });
  return { data, isLoading, isError, refetch };
};
