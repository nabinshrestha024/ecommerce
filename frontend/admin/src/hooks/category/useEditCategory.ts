"use client";

import { editCategory } from "@/lib/category/editCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: editCategory,

    onSuccess: () => {
      toast.success("Category edited sucessfully");
      queryClient.invalidateQueries({ queryKey: ["categoryData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
