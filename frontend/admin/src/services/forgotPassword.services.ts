import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";
export const sendEmailForPasswordReset = async ({
  email,
}: {
  email: string;
}) => {
  return await axiosInstance.post(endpoint.FORGOT_PASSWORD, { email });
};
export const verifyOTP = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  return await axiosInstance.post(endpoint.VERIFY_OTP, { email, otp });
};
export const resetPassword = async ({
  email,
  otp,
  newPassword,
}: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  return await axiosInstance.post(endpoint.RESET_PASSWORD, {
    email,
    otp,
    newPassword,
  });
};
