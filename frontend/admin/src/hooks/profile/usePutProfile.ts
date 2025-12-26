import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/profile.services";
import { toast } from "sonner";
export const usePutProfile = () => {
  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Profile update failed");
    },
  });
};
