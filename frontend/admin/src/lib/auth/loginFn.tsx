import type { LoginFormType } from "@/components/Login/AdminLoginForm.zod";
import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";
import { toast } from "sonner";
export const LoginFunction = async (data: LoginFormType) => {
  const response = await axiosInstance.post(endpoint.LOGIN, data);
  if (!response) {
    toast.error("No response from server");
  }
  return response.data;
};
