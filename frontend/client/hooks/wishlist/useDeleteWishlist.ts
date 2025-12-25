import { deleteWishlist } from "@/lib/wishlist/deleteWishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["deleteWishlist"],
    mutationFn: deleteWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-wishlist"] });
      toast.success("Item deleted from wishlist");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return data;
};
