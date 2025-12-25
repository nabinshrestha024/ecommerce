import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const changePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await axiosInstance.post(endpoint.CHANGEPASSWORD, {
    currentPassword,
    newPassword,
  });
  return res.data;
};
