"use client";

import { useQuery } from "@tanstack/react-query";
import type { OrderResponse } from "./useFetchOrder";
import { sortOrder } from "@/lib/order/sortOrder";

export const useSortOrder = (name: string, pageIndex: number) => {
  const { data, isLoading, isError, refetch } = useQuery<OrderResponse>({
    queryKey: ["orderData", name, pageIndex],
    queryFn: () => sortOrder(name, pageIndex),
  });
  return { data, isLoading, isError, refetch };
};
