import { updateSocialLinks } from "@/lib/socialLinks/updateSocialLinks";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateSocialLinks = () => {
  const data = useMutation({
    mutationKey: ["updateSocialLinks"],
    mutationFn: updateSocialLinks,
    onError: () => {
      toast.error("Failed to update social links");
    },
  });
  return data;
};
