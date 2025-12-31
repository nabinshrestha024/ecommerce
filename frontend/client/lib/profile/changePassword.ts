import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

interface PasswordType {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async ({
  currentPassword,
  newPassword,
}: PasswordType) => {
  const res = await axiosInstance.post(endpoint.CHANGEPASSWORD, {
    currentPassword,
    newPassword,
  });
  return res.data;
};
