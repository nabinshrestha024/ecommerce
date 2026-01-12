"use client";

import { editUser } from "@/lib/user/editUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: editUser,

    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },

    onError: () => {
      toast.error("Failed to update customer");
    },
  });
};
