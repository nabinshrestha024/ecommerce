import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";
import { toast } from "sonner";

export const resetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  const res = await axiosInstance.post(endpoint.RESETPASSWORD, data);
  if (!res) {
    toast.error("Error occured in resetting password!");
  }
  return res.data;
};
