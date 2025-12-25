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
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Vendor deletion failed");
    },
  });
};
