import { fetchProductReview } from "@/lib/productReview/fetchProductReview";
import { useQuery } from "@tanstack/react-query";

export const useFetchProductReview = (page: number, pageSize: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchProductReview", page, pageSize],
    queryFn: () => fetchProductReview(page, pageSize),
  });
  return { data, isLoading, isError, error };
};
