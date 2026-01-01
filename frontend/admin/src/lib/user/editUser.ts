import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
interface Person {
  userId: number;
  email: string;
  fullName: string;
  passwordHash: string;
  status: number;
  profileImageUrl: string | null;
  phone: string;
  address: string;
  city: string;
  role: boolean;
  refreshToken: string | null;
  accessToken: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userProfile: string;
  socialLinks: string;
  orders: string;
}

export const editUser = async ({
  userId,
  userData,
}: {
  userId: number;
  userData: Person;
}) => {
  try {
    const res = await axiosInstance.put(`${endpoint.USER}/${userId}`, userData);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || "Failed to delete product");
    }
    throw e;
  }
};
