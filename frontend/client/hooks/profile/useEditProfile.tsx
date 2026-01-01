import { editProfile } from "@/lib/profile/editProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: editProfile,
    onSuccess: () => {
      toast.success("Profile Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["fetchProfile"] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
  return data;
};
