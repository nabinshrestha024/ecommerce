"use client";

import type { ProductData } from "@/components/Category/CategoryTable";
import { ProductTable } from "@/lib/product/getProduct";
import { useQuery } from "@tanstack/react-query";

type ProductResponse = {
  items: ProductData[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useProduct = (pageIndex: number) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["productData"],
    queryFn: () => ProductTable(pageIndex),
  });
  return { data, isLoading, isError, refetch };
};
