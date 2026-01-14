import { getCustomerReport } from "@/lib/customer/getCustomerReport";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomerReport = (period: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getCustomerReport", period],
    queryFn: () => getCustomerReport(period),
  });
  return { data, isLoading, isError, error };
};
