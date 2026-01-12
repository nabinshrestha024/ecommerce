import { getVendors } from "@/services/vendor.services";
import { useQuery } from "@tanstack/react-query";
export const useGetVendor = (pageIndex: number, pageSize: number) => {
  const data = useQuery({
    queryKey: ["vendor", pageIndex, pageSize],
    queryFn: () => getVendors(pageIndex, pageSize),
  });
  return data;
};
