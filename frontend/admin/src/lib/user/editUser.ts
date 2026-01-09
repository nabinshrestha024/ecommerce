import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
interface Person {
  userid: number;
  email: string;
  fullName: string;
  profileImageUrl: string | null;
  phone: string;
  address: string;
  role: boolean;
  isActive: boolean;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}

export const editUser = async ({
  userid,
  userData,
}: {
  userid: number;
  userData: Person;
}) => {
  try {
    const res = await axiosInstance.put(`${endpoint.USER}/${userid}`, userData);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || "Failed to delete product");
    }
    throw e;
  }
};
