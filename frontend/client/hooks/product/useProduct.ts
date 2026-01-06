"use client";
import {
  Variant,
  VariantAttributes,
} from "@/components/Product/ProductDetails";
import { Product } from "@/lib/product/getProduct";
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
  variants: Variant[];
  availableAttributes: VariantAttributes[];
};

type ProductResponse = {
  items: ProductData[];
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
