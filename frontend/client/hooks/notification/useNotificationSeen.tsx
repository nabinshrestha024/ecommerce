import { notificationSeen } from "@/lib/notification/notificationSeen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useNotificationSeen = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["notificationSeen"],
    mutationFn: notificationSeen,
    onSuccess: () => {
      console.log("Triggered");
    },
    onError: () => {
      toast.error("An error occured");
    },
  });
  return data;
};
