import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const notificationSeen = async (id: number) => {
  const res = await axiosInstance.put(
    `${endpoint.NOTIFICATIONSEEN}/${id}/read`,
  );
  return res.data;
};
