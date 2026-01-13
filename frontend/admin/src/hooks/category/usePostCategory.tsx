"use client";

import { postCategory } from "@/lib/category/postCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: postCategory,

    onSuccess: () => {
      toast.success("Category Added successfully");
      queryClient.invalidateQueries({ queryKey: ["categoryData"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
