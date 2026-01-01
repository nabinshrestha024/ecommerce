import { removeSocialLinks } from "@/lib/socialLinks/removeSocialLinks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteSocialLinks = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["deleteSocialLink"],
    mutationFn: removeSocialLinks,
    onSuccess: () => {
      toast.success("Social Link deleted succcessfully");
      queryClient.invalidateQueries({ queryKey: ["fetchSocialLink"] });
    },
    onError: () => {
      toast.error("Failed to delete social link");
    },
  });
  return data;
};
