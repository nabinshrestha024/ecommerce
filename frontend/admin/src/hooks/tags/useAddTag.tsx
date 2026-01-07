import { addTag } from "@/lib/tags/addTag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddTag = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["addTag"],
    mutationFn: addTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTag"] });
      toast.success("Tag added successfully");
    },
  });
  return data;
};
