import { updateVendor } from "@/services/vendor.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useUpdateVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateVendor"],
    mutationFn: updateVendor,
    onSuccess: () => {
      toast.success("Vendor updated successfully");
      queryClient.invalidateQueries({ queryKey: ["vendor"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Vendor update failed");
    },
  });
};
