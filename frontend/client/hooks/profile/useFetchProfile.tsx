import { fetchProfile } from "@/lib/profile/fetchProfile";
import { useQuery } from "@tanstack/react-query";

export const useFetchProfile = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchProfile"],
    queryFn: fetchProfile,
  });
  return { data, isLoading, isError, error };
};
