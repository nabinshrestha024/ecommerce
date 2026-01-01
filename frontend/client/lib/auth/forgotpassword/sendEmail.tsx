import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";
import { toast } from "sonner";

export const sendEmail = async (data: { email: string }) => {
  const res = await axiosInstance.post(endpoint.FORGOTPASSWORD, data);
  if (!res) {
    toast.error("Error submitting email to recover account!");
  }
  return res.data;
};
