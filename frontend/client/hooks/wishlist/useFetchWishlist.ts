"use client";
import { fetchWishlist } from "@/lib/wishlist/fetchWishlist";
import { useQuery } from "@tanstack/react-query";

export const useFetchWishlist = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["fetch-wishlist"],
    queryFn: fetchWishlist,
  });
  return { data, isLoading, isError, refetch };
};
