import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/profile.services";
import { toast } from "sonner";
export const usePutProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Profile update failed");
    },
  });
};
