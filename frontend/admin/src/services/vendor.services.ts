import { endpoint } from "@/lib/endpoint";
import { axiosInstance } from "@/lib/axiosInstance";
export const getVendors = async () => {
  const response = await axiosInstance.get(endpoint.VENDOR);
  return response.data;
};
export const postVendor = async (vendorData: Record<string, unknown>) => {
  return await axiosInstance.post(endpoint.VENDOR, vendorData);
};
export const updateVendor = async (args: {
  vendorId: number | string;
  vendorData: Record<string, unknown>;
}) => {
  const { vendorId, vendorData } = args;
  return await axiosInstance.put(`${endpoint.VENDOR}/${vendorId}`, vendorData);
};
export const deleteVendor = async (vendorId: number) => {
  return await axiosInstance.delete(`${endpoint.VENDOR}/${vendorId}`);
};
