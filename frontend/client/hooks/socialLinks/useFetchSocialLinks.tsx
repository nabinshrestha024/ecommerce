import { fetchSocialLinks } from "@/lib/socialLinks/fetchSocialLinks";
import { useQuery } from "@tanstack/react-query";

export const useFetchSocialLinks = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["fetchSocialLink"],
    queryFn: fetchSocialLinks,
  });
  return { data, isLoading, isError, error, refetch };
};
