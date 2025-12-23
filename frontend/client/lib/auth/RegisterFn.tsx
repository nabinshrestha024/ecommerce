import { toast } from "sonner";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
import { RegisterPayload } from "@/components/Register/RegisterForm";

export const registerFn = async (data: RegisterPayload) => {
  const res = await axiosInstance.post(endpoint.REGISTER, data);
  if (!res) {
    toast.error("Error submitting data for register!");
  }
  return res.data;
};
