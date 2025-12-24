import { LoginFormSchemaType } from "@/components/Login/loginForm.zod";
import { toast } from "sonner";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const loginFn = async (data: LoginFormSchemaType) => {
  const res = await axiosInstance.post(endpoint.LOGIN, data);
  if (!res) {
    toast.error("Error submitting data for login!");
  }
  return res.data;
};
