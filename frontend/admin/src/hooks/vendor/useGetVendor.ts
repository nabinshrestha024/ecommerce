import { getVendors } from "@/services/vendor.services";
import { useQuery } from "@tanstack/react-query";
export const useGetVendor = () => {
  const data = useQuery({
    queryKey: ["vendor"],
    queryFn: getVendors,
  });
  return data;
};
