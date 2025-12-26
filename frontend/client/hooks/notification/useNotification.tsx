import { NotificationType } from "@/components/Notification/Notification";
import { fetchNotification } from "@/lib/notification/fetchNotification";
import { useQuery } from "@tanstack/react-query";

export const useNotification = () => {
  const { data, isLoading, isError, error } = useQuery<NotificationType[]>({
    queryKey: ["fetchNotification"],
    queryFn: fetchNotification,
  });
  return { data, isLoading, isError, error };
};
