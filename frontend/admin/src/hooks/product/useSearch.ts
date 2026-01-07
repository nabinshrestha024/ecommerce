"use client";

import { searchProduct } from "@/lib/product/getSearchProduct";
import { useQuery } from "@tanstack/react-query";
import type { ProductResponse } from "./useProduct";

export const useSearch = (name: string, pageIndex: number) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["productData", name],
    queryFn: () => searchProduct(name, pageIndex),
  });
  return { data, isLoading, isError, refetch };
};
