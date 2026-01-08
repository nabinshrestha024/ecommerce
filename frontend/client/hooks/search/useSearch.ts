"use client";
import { searchProduct } from "@/lib/search/serachProduct";
import { useQuery } from "@tanstack/react-query";

interface ImageType {
  productImageId: number;
  imageUrl: string;
  productId: number;
  isPrimary: boolean;
  sortOrder: number;
}

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
  images: ImageType[];
};

type ProductResponse = {
  items: ProductData[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useSearch = (productName: string) => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["product", productName],
    queryFn: () => searchProduct(productName),
    enabled: !!productName,
  });
  return { data, isLoading, isError, refetch };
};
