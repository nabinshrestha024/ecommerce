import { getSalesByCategory } from "@/services/report.services";
import { useQuery } from "@tanstack/react-query";

export const useGetSalesCategory = (startDate: string, endDate: string) => {
  const data = useQuery({
    queryKey: ["sales-by-category", startDate, endDate],
    queryFn: () => getSalesByCategory(startDate, endDate),
  });
  return data;
};
