import { deleteVendor } from "@/services/vendor.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useDeleteVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteVendor"],
    mutationFn: deleteVendor,
    onSuccess: () => {
      toast.success("Vendor deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["vendor"] });
    },
    onError: () => {
      toast.error("Vendor deletion failed");
    },
  });
};
