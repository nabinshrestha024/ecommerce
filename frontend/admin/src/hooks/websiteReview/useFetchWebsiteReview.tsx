import { fetchWebsiteReview } from "@/lib/websiteReview/fetchWebsiteReview";
import { useQuery } from "@tanstack/react-query";

export const useFetchWebsiteReview = (page: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchWebsiteReview", page],
    queryFn: () => fetchWebsiteReview(page),
  });
  return { data, isLoading, isError, error };
};
