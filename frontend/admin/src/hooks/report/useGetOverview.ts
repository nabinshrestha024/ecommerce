import { getSalesOverview } from "@/services/report.services";
import { useQuery } from "@tanstack/react-query";

export interface SalesDataType {
  date: string;
  totalSales: number;
  totalOrders: number;
}

export const useGetOverview = (startDate: string, endDate: string) => {
  const { data, isLoading, isError, error } = useQuery<SalesDataType[]>({
    queryKey: ["report-overview", startDate, endDate],
    queryFn: () => getSalesOverview(startDate, endDate),
  });
  return { data, isLoading, isError, error };
};
