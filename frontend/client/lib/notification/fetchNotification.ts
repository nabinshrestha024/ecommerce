import { NotificationType } from "@/components/Notification/Notification";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchNotification = async () => {
  const res = await axiosInstance.get<NotificationType[]>(
    endpoint.FETCHNOTIFICATION,
  );
  return res.data;
};
