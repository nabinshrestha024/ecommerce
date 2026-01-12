import { getCatalogProducts } from "@/services/filter/filter.services";
import { useQuery } from "@tanstack/react-query";

export const useGetCatalogProduct = (filterData: {
  categoryId?: number;
  tagNames?: string[];
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["catalogProducts", filterData],
    queryFn: () => getCatalogProducts(filterData),
  });
};
