"use client";

import { postAttribute } from "@/lib/attribute/postAttribute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostAttribute = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateAttribute"],
    mutationFn: postAttribute,

    onSuccess: () => {
      toast.success("Attribute added");
      queryClient.invalidateQueries({ queryKey: ["attributeData"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
