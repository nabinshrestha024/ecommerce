import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePassword } from "@/lib/profile/changePassword";

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => changePassword({ currentPassword, newPassword }),
    onSuccess: () => {
      toast.success("Password changed successfully");
      queryClient.invalidateQueries({ queryKey: ["fetchProfile"] });
    },
    onError: () => {
      const message = "Something went wrong";
      toast.error(message);
    },
  });
};
