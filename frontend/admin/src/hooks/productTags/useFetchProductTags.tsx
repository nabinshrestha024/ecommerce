import { fetchProductTags } from "@/lib/productTags/fetchProductTags";
import { useQuery } from "@tanstack/react-query";

export const useFetchProductTags = (id: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchProductTags"],
    queryFn: () => fetchProductTags(id),
  });
  return { data, isLoading, isError, error };
};
