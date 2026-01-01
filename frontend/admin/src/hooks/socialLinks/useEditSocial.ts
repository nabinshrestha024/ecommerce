"use client";

import { getEditSocial } from "@/lib/socialLinks/getEditSocial";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateSocial"],
    mutationFn: getEditSocial,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socialData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
