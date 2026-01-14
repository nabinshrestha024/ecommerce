"use client";

import { editVariant } from "@/lib/variants/editVariant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editVariant"],
    mutationFn: editVariant,

    onSuccess: () => {
      toast.success("Variant updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productData"] });
    },

    onError: () => {
      toast.error("Failed to update variant");
    },
  });
};
