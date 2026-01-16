import { uploadProfile } from "@/lib/profile/uploadProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useUploadProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["uploadProfile"],
    mutationFn: uploadProfile,
    onSuccess: () => {
      toast.success("Profile picture uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["fetchProfile"] });
    },
    onError: () => {
      toast.error("Profile uploading failed");
    },
  });
};
