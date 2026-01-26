"use client";

import { useQuery } from "@tanstack/react-query";
import type { ProductResponse } from "./useProduct";
import { sortProduct } from "@/lib/product/getSortProduct";

export const useSortProduct = (name: string, pageIndex: number) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["productData", name],
    queryFn: () => sortProduct(name, pageIndex),
  });
  return { data, isLoading, isError, refetch };
};
