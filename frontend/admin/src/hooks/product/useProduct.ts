"use client";

import { ProductTable } from "@/lib/product/getProduct";
import { useQuery } from "@tanstack/react-query";

type ProductData = {
  productId: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: number;
  stockQuantity: number;
  primaryImageUrl: string;
  isActive: boolean;
  categoryId: number;
  sku: string;
  primaryIndex: number;
};

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
