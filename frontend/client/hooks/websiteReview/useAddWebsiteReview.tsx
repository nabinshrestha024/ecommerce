import { addWebsiteReview } from "@/services/website/website.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useAddWebsiteReview = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["AddWebsiteReview"],
    mutationFn: addWebsiteReview,
    onSuccess: () => {
      toast.success("Review added successfully");
      queryClient.invalidateQueries({ queryKey: ["WebsiteReview"] });
    },
    onError: () => {
      toast.error("Failed to add Review");
    },
  });
  return data;
};
