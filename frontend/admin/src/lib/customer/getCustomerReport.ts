import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export interface CustomerReportType {
  date: string;
  totalRegistrations: number;
}

export const getCustomerReport = async (period: string) => {
  const res = await axiosInstance.get<CustomerReportType[]>(
    `${endpoint.USERREPORT}?Period=${period}`,
  );
  return res.data;
};
