import { getSalesOverview } from "@/services/report.services";
import { useQuery } from "@tanstack/react-query";

export const useGetOverview = (startDate: string, endDate: string) => {
  const data = useQuery({
    queryKey: ["report-overview", startDate, endDate],
    queryFn: () => getSalesOverview(startDate, endDate),
  });
  return data;
};
