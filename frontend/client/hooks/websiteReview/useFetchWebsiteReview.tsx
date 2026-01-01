import { getWebsiteReview } from "@/services/website/website.services";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
export const useFetchWebsiteReview = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["WebsiteReview"],
    queryFn: getWebsiteReview,
  });
  return { data, isLoading, isError, error, refetch };
};
