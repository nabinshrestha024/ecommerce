"use client";
import { fetchCategory } from "@/lib/category/fetchCategory";
import { useQuery } from "@tanstack/react-query";

export type CategoryData = {
  categoryId: number;
  name: string;
  categoryImageURL: File;
  description: string;
  isFeatured: boolean;
  sortOrder: number;
  isActive: boolean;
};

export const useFetchCategory = () => {
  const { data, isLoading, isError, refetch } = useQuery<CategoryData[]>({
    queryKey: ["categoryData"],
    queryFn: fetchCategory,
  });
  return { data, isLoading, isError, refetch };
};
