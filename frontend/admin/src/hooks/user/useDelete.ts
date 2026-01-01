"use client";

import { deleteUser } from "@/lib/user/deleteUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,

    onSuccess: () => {
      toast.success("Delete user ");
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
