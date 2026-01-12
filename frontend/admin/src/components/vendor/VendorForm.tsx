import { useForm } from "react-hook-form";
import { Input } from "../Input/Input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { VendorFormSchema } from "./VendorForm.zod.ts";
import type { VendorFormValues } from "./VendorForm.zod.ts";
import { useUpdateVendor } from "@/hooks/vendor/useUpdateVendor.ts";
interface Vendor {
  vendorId: number | string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  joinedOn: string;
}

type Props = {
  vendor: Vendor;
  onSave: (vendor: Vendor) => void;
};

export const VendorForm = ({ vendor, onSave }: Props) => {
  const { mutate } = useUpdateVendor();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VendorFormValues>({
    resolver: zodResolver(VendorFormSchema),
    defaultValues: {
      name: vendor.businessName,
      contactPerson: vendor.contactPerson,
      email: vendor.email,
      phone: vendor.phone,
      address: vendor.address,
    },
    mode: "onChange",
  });

  const onSubmit = (data: VendorFormValues) => {
    const updatedVendor: Vendor = {
      ...vendor,
      businessName: data.name,
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };
    mutate({
      vendorId: vendor.vendorId,
      vendorData: {
        businessName: data.name,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    });
    onSave(updatedVendor);
    reset({
      name: updatedVendor.businessName,
      contactPerson: updatedVendor.contactPerson,
      email: updatedVendor.email,
      phone: updatedVendor.phone,
      address: updatedVendor.address,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-h-40vh overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <h2 className="text-[24px] font-bold mb-6 text-center">Edit Vendor</h2>

        <div className="grid grid-cols-[1fr_3fr] gap-4 items-center mt-5 ">
          <label className="font-medium ">Business Name</label>
          <div className="col-span-1 w-full">
            <Input
              type="text"
              placeholder="Enter business name"
              {...register("name")}
              className="w-full px-4 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.name && (
              <p className="text-[12px] text-red-500">{errors.name.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-[1fr_3fr] gap-4 items-center mt-5">
          <label className="font-medium ">Contact Person</label>
          <div className="col-span-1 w-full">
            <Input
              type="text"
              placeholder="Enter contact person"
              {...register("contactPerson")}
              className="w-full px-4  border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.contactPerson && (
              <p className="text-[12px] text-red-500">
                {errors.contactPerson.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_3fr] gap-4 items-center mt-5">
          <label className="font-medium ">Email</label>
          <div className="col-span-1 w-full">
            <Input
              type="email"
              placeholder="Enter email address"
              {...register("email")}
              className="w-full px-4  border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.email && (
              <p className="text-[12px] text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_3fr] gap-4 items-center mt-5">
          <label className="font-medium ">Phone</label>
          <div className="col-span-1 w-full">
            <Input
              type="text"
              placeholder="Enter phone number"
              {...register("phone")}
              className="w-full px-4 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.phone && (
              <p className="text-[12px] text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_3fr] gap-4 items-center mt-5">
          <label className="font-medium ">Address</label>
          <div className="col-span-1 w-full">
            <Input
              type="text"
              placeholder="Enter address"
              {...register("address")}
              className="w-full px-4 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.address && (
              <p className="text-[12px] text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
          >
            Save Vendor
          </button>
        </div>
      </form>
    </div>
  );
};
