import { endpoint } from "@/lib/endpoint";
import { axiosInstance } from "@/lib/axiosInstance";
export const getVendors = async () => {
  try {
    const response = await axiosInstance.get(endpoint.VENDOR);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postVendor = async (vendorData: any) => {
  return await axiosInstance.post(endpoint.VENDOR, vendorData);
};
export const updateVendor = async (args: {
  vendorId: number | string;
  vendorData: any;
}) => {
  const { vendorId, vendorData } = args;
  return await axiosInstance.put(`${endpoint.VENDOR}/${vendorId}`, vendorData);
};
export const deleteVendor = async (vendorId: number) => {
  return await axiosInstance.delete(`${endpoint.VENDOR}/${vendorId}`);
};
