"use client";

import { getDeleteSocial } from "@/lib/socialLinks/getDeleteSocial";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateSocial"],
    mutationFn: getDeleteSocial,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socialData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
