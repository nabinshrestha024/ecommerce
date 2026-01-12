import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export const getSalesOverview = async (startDate: string, endDate: string) => {
  const response = await axiosInstance.get(
    `${endpoint.REPORT}/sales-overview`,
    { params: { FromDate: startDate, ToDate: endDate } },
  );
  return response.data;
};
export const getTopProducts = async (startDate: string, endDate: string) => {
  const response = await axiosInstance.get(`${endpoint.REPORT}/top-products`, {
    params: { FromDate: startDate, ToDate: endDate },
  });
  return response.data;
};
export const getSalesByCategory = async (
  startDate: string,
  endDate: string,
) => {
  const response = await axiosInstance.get(
    `${endpoint.REPORT}/category-sales`,
    { params: { FromDate: startDate, ToDate: endDate } },
  );
  return response.data;
};
export const getLowStockProducts = async (
  startDate: string,
  endDate: string,
) => {
  const response = await axiosInstance.get(`${endpoint.REPORT}/low-stock`, {
    params: { FromDate: startDate, ToDate: endDate },
  });
  return response.data;
};
