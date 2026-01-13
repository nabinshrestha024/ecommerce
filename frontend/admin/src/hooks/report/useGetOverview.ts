import { getSalesOverview } from "@/services/report.services";
import { useQuery } from "@tanstack/react-query";

export interface SalesDataType {
  date: string;
  totalSales: number;
  totalOrders: number;
}

export const useGetOverview = (period: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    SalesDataType[]
  >({
    queryKey: ["report-overview"],
    queryFn: () => getSalesOverview(period),
  });
  return { data, isLoading, isError, error, refetch };
};
