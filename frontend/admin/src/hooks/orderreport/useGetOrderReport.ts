import { getSalesReport } from "@/services/report.services";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderReport = () => {
  const data = useQuery({
    queryKey: ["order-status-report"],
    queryFn: () => getSalesReport(),
  });
  return data;
};
