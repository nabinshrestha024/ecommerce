import { fetchProductReview } from "@/lib/productReview/fetchProductReview";
import { useQuery } from "@tanstack/react-query";

export const useFetchProductReview = (page: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchProductReview", page],
    queryFn: () => fetchProductReview(page),
  });
  return { data, isLoading, isError, error };
};
