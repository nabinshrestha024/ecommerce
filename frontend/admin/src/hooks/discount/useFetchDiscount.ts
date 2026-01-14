"use client";

import { Discount } from "@/lib/discount/fetchDiscount";
import { useQuery } from "@tanstack/react-query";

export type DiscountData = {
  discountId: number;
  discountType: string;
  discountName: string;
  discountValue: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
};

export const useFetchDiscountProduct = () => {
  const { data, isLoading, isError, refetch } = useQuery<DiscountData>({
    queryKey: ["discountData"],
    queryFn: Discount,
  });

  return { data, isLoading, isError, refetch };
};
