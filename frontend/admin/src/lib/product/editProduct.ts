import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const editProduct = async ({
  productId,
  productData,
}: {
  productId: number;
  productData: FormData;
}) => {
  try {
    const res = await axiosInstance.put(
      `${endpoint.FETCH_PRODUCT}/${productId}`,
      productData,
    );
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    }
  }
};
