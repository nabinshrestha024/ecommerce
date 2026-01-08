"use client";
import { searchProduct } from "@/lib/search/searchProduct";
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
  relatedProducts: ProductData[];
};

type ProductResponse = {
  items: ProductData[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useSearchs = (productName: string) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["product", productName],
    queryFn: () => searchProduct(productName),
    enabled: !!productName,
  });
  return { data, isLoading, isError, refetch };
};
