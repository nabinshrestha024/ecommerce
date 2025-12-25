"use client";

import { addWishlist } from "@/lib/wishlist/addWishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-wishlist"],
    mutationFn: addWishlist,

    onSuccess: (data) => {
      console.log("wish", data);

      if (data) {
        toast.success("Wishlist added successful!");
        queryClient.invalidateQueries({ queryKey: ["fetch-wishlist"] });
      } else {
        toast.error("Failed to add wishlist!");
      }
    },

    onError: () => {
      toast.error("Please ensure you are logged in to add wishlist.");
    },
  });
}
