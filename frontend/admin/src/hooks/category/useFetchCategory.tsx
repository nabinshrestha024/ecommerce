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

export const useFetchCategory = (pageIndex: number, pageSize: number) => {
  const { data, isLoading, isError, refetch } = useQuery<CategoryData[]>({
    queryKey: ["categoryData", pageIndex, pageSize],
    queryFn: () => fetchCategory(pageIndex, pageSize),
  });
  return { data, isLoading, isError, refetch };
};
