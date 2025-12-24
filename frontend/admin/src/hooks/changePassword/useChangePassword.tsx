import { changePassword } from "@/lib/changePassword/changePassword";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChangePassword = () => {
  const data = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return data;
};
