import { getTags } from "@/services/filter/filter.services";
import { useQuery } from "@tanstack/react-query";

export const useFetchTags = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["fetchTags"],
    queryFn: getTags,
  });
  return { data, isLoading, isError, error, refetch };
};
