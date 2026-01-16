import { getDashboardOrderReport } from "@/services/report.services";
import { useQuery } from "@tanstack/react-query";

export interface DashboardReportData {
  totalOrders: number;
  pending: number;
  delivered: number;
  canceled: number;
}
export const useGetDashboardReport = (period: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    DashboardReportData[]
  >({
    queryKey: ["report-overview"],
    queryFn: () => getDashboardOrderReport(period),
  });
  return { data, isLoading, isError, error, refetch };
};
