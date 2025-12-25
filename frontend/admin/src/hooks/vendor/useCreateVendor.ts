import { postVendor } from "@/services/vendor.services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCreateVendor = () => {
  return useMutation({
    mutationKey: ["putVendor"],
    mutationFn: postVendor,
    onSuccess: () => {
      toast.success("Vendor created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Vendor creation failed");
    },
  });
};
