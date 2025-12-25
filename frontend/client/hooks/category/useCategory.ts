"use client";
import { CategoryProduct } from "@/lib/categoryProduct/getProductByCategory";
import { useQuery } from "@tanstack/react-query";

type CategoryData = {
  categoryId: number;
  name: string;
  slug: string;
  categoryImageURL: string;
  description: string;
  isFeatured: boolean;
  sortOrder: number;
  isActive: boolean;
};

type ProductResponse = {
  items: CategoryData[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useCategory = () => {
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["catgeory"],
    queryFn: CategoryProduct,
  });

  console.log("Catgeory: ", data);
  return { data, isLoading, isError, refetch };
};
