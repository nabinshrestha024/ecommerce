import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/profile.services";
export const useGetProfile = () => {
  const data = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  return data;
};
