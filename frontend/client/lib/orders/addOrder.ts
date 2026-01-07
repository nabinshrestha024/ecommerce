import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

interface OrderDataType {
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPhone: string;
  selectedCartItemIds: number[];
}

export const addOrder = async ({
  shippingName,
  shippingAddress,
  shippingCity,
  shippingPhone,
  selectedCartItemIds,
}: OrderDataType) => {
  const res = await axiosInstance.post(endpoint.ADDORDER, {
    shippingName,
    shippingAddress,
    shippingCity,
    shippingPhone,
    selectedCartItemIds,
  });
  return res.data;
};
