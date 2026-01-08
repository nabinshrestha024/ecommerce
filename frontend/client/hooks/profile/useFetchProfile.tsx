import { useAuth } from "@/contexts/AuthContext";
import { fetchProfile } from "@/lib/profile/fetchProfile";
import { useQuery } from "@tanstack/react-query";

export const useFetchProfile = () => {
  const { token } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchProfile"],
    queryFn: fetchProfile,
    enabled: !!token,
  });
  return { data, isLoading, isError, error };
};
