import { addSocialLinks } from "@/lib/socialLinks/addSocialLinks";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddSocialLinks = () => {
  const data = useMutation({
    mutationKey: ["addSocialLinks"],
    mutationFn: addSocialLinks,
    onError: () => {
      toast.error("Failed to update social links");
    },
  });
  return data;
};
