"use client";

import { postSocial } from "@/lib/socialLinks/postSocial";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostSocial = () => {
  return useMutation({
    mutationKey: ["updateSocial"],
    mutationFn: postSocial,

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
