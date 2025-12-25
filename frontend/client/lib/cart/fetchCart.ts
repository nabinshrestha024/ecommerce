import { CartProductType } from "@/components/Navbar/components/TopNav";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchCart = async () => {
  const res = await axiosInstance.get<CartProductType[]>(endpoint.FETCHCART);
  return res.data;
};
