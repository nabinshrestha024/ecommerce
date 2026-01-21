"use client";

import { deleteBanner } from "@/lib/banner/deleteBanner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteBanner"],
    mutationFn: deleteBanner,

    onSuccess: (e) => {
      toast.success(e.message);
      queryClient.invalidateQueries({ queryKey: ["bannerData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
