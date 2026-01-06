"use client";

import { deleteSocial } from "@/lib/socialLinks/deleteSocial";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateSocial"],
    mutationFn: deleteSocial,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socialData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
