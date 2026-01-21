"use client";

import { postBanner } from "@/lib/banner/postBanner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateBanner"],
    mutationFn: postBanner,

    onSuccess: (e) => {
      toast.success(e.message);
      queryClient.invalidateQueries({ queryKey: ["bannerData"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
