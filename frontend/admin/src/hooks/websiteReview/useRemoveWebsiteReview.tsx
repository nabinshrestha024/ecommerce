import { removeWebsiteReview } from "@/lib/websiteReview/removeWebsiteReview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveWebsiteReview = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["removeWebsiteReview"],
    mutationFn: removeWebsiteReview,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["fetchWebsiteReview"] });
    },
    onError: (data) => {
      toast.error(data.message || "An error occured");
    },
  });
  return data;
};
