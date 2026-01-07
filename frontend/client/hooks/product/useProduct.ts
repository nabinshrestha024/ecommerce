"use client";
import {
  Variant,
  VariantAttributes,
} from "@/components/Product/ProductDetails";
import { ProductType } from "@/components/Product/ProductDisplay";
import { Product } from "@/lib/product/getProduct";
import { useQuery } from "@tanstack/react-query";

type ProductResponse = {
  items: ProductType[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useProduct = () => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["product"],
    queryFn: Product,
  });
  return { data, isLoading, isError, refetch };
};
