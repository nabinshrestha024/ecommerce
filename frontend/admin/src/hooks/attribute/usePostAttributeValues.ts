"use client";

import { postAttributeValue } from "@/lib/attribute/postAttributeValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostAttributeValue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateAttribute"],
    mutationFn: postAttributeValue,

    onSuccess: () => {
      toast.success("Attribute value is added");
      queryClient.invalidateQueries({ queryKey: ["attributeData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
