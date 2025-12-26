import { getTopProducts } from "@/services/report.services";
import { useQuery } from "@tanstack/react-query";

export const useGetTopProduct = (startDate: string, endDate: string) => {
  const data = useQuery({
    queryKey: ["top-products", startDate, endDate],
    queryFn: () => getTopProducts(startDate, endDate),
  });
  return data;
};
