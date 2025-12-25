"use client";
import { Category } from "@/lib/category/FetchCategoryFunction";
import { useQuery } from "@tanstack/react-query";

export type CategoryData = {
  categoryId: number;
  name: string;
  slug: string;
  categoryImageUrl: null;
  description: string;
  isFeatured: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
};

export const useFetchCategory = () => {
  const { data, isLoading, isError, refetch } = useQuery<CategoryData[]>({
    queryKey: ["categoryData"],
    queryFn: Category,
  });
  return { data, isLoading, isError, refetch };
};
