"use client";

import { deleteCategory } from "@/lib/category/deleteCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: deleteCategory,

    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categoryData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
