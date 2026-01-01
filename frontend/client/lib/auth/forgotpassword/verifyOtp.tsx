import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";
import { toast } from "sonner";

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const res = await axiosInstance.post(endpoint.VERIFYOTP, data);
  if (!res) {
    toast.error("Error verifying OTP!");
  }
  return res.data;
};
