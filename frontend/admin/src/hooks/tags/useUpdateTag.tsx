import { editTag } from "@/services/tags.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTag"],
    mutationFn: ({
      tagId,
      tagData,
    }: {
      tagId: number | string;
      tagData: Record<string, unknown>;
    }) => editTag(tagId, tagData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTag"] });
      toast.success("Tag updated successfully");
    },
    onError: () => {
      toast.error("Failed to update tag");
    },
  });
};
