import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const updateCart = async ({
  cartId,
  quantity,
}: {
  cartId: number;
  quantity: number;
}) => {
  const res = await axiosInstance.put(
    endpoint.UPDATECART,
    { quantity },
    {
      params: { cartId },
    },
  );
};
