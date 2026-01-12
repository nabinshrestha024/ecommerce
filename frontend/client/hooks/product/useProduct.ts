"use client";

import { ProductType } from "@/components/Product/ProductDisplay";
import { Product } from "@/lib/product/getProduct";
import { useQuery } from "@tanstack/react-query";

export type ProductResponse = {
  items: ProductType[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useProduct = (pageIndex: number, pageSize: number) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["product", pageIndex, pageSize],
    queryFn: () => Product(pageIndex, pageSize),
  });
  return { data, isLoading, isError, refetch };
};
