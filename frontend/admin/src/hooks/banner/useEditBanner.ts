"use client";

import { editBanner } from "@/lib/banner/editBanner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editBanner"],
    mutationFn: editBanner,

    onSuccess: (e) => {
      toast.success(e.message);
      queryClient.invalidateQueries({ queryKey: ["bannerData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
