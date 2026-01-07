import { fetchTag } from "@/lib/tags/fetchTag";
import { useQuery } from "@tanstack/react-query";

export const useFetchTag = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchTag"],
    queryFn: fetchTag,
  });
  return { data, isLoading, isError, error };
};
