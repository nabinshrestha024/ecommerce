"use client";

import { editAttributeName } from "@/lib/attribute/editAttributeName";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditAttributeName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateAttribute"],
    mutationFn: editAttributeName,

    onSuccess: () => {
      toast.success("Attribute name is edited");
      queryClient.invalidateQueries({ queryKey: ["attributeData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
