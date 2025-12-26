import { useQuery } from "@tanstack/react-query";
import { getLowStockProducts } from "@/services/report.services";
export const useGetLowStock = (startDate: string, endDate: string) => {
  const data = useQuery({
    queryKey: ["low-stock-products", startDate, endDate],
    queryFn: () => getLowStockProducts(startDate, endDate),
  });
  return data;
};
