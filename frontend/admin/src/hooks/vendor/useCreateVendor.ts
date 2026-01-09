import { postVendor } from "@/services/vendor.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["putVendor"],
    mutationFn: postVendor,
    onSuccess: () => {
      toast.success("Vendor created successfully");
      queryClient.invalidateQueries({ queryKey: ["vendor"] });
    },
    onError: () => {
      toast.error("Vendor creation failed");
    },
  });
};
