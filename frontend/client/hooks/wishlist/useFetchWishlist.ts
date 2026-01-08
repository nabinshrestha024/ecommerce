"use client";
import { useAuth } from "@/contexts/AuthContext";
import { fetchWishlist } from "@/lib/wishlist/fetchWishlist";
import { useQuery } from "@tanstack/react-query";

export const useFetchWishlist = () => {
  const { token } = useAuth();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["fetch-wishlist"],
    queryFn: fetchWishlist,
    enabled: !!token,
  });
  return { data, isLoading, isError, refetch };
};
