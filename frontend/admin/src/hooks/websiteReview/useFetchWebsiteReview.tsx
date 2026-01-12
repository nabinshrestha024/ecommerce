import { fetchWebsiteReview } from "@/lib/websiteReview/fetchWebsiteReview";
import { useQuery } from "@tanstack/react-query";

export const useFetchWebsiteReview = (page: number, pageSize: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchWebsiteReview", page, pageSize],
    queryFn: () => fetchWebsiteReview(page, pageSize),
  });
  return { data, isLoading, isError, error };
};
