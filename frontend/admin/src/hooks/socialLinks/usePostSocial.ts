"use client";

import { getPostSocial } from "@/lib/socialLinks/getPostSocial";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostSocial = () => {
  return useMutation({
    mutationKey: ["updateSocial"],
    mutationFn: getPostSocial,

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
