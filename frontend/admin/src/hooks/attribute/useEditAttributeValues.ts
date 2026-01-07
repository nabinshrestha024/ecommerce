"use client";

import { editAttributeValue } from "@/lib/attribute/editAttributeValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditAttributeValue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateAttribute"],
    mutationFn: editAttributeValue,

    onSuccess: () => {
      toast.success("Attribute value is edited");
      queryClient.invalidateQueries({ queryKey: ["attributeData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
