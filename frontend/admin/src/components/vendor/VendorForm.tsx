import { useForm } from "react-hook-form";
import { Input } from "../Input/Input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { VendorFormSchema } from "./VendorForm.zod.ts";
import type { VendorFormValues } from "./VendorForm.zod.ts";
interface Vendor {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  totalProducts: number;
  completedOrders: number;
  canceledOrders: number;
  status: "active" | "pending" | "inactive" | "blocked";
}

type Props = {
  vendor: Vendor;
  onSave: (vendor: Vendor) => void;
};

export const VendorForm = ({ vendor, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VendorFormValues>({
    resolver: zodResolver(VendorFormSchema),
    defaultValues: vendor,
    mode: "onChange",
  });

  const onSubmit = (data: VendorFormValues) => {
    console.log("Form Data:", data);
    const updatedVendor: Vendor = {
      ...vendor,
      ...data,
    };
    onSave(updatedVendor);
    reset(updatedVendor);
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold mb-6 text-center">Edit Vendor</h2>

        <div className="grid grid-cols-4 gap-4 items-center">
          <label className="col-span-1 font-medium ">Vendor ID</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder="Enter vendor ID"
              {...register("id")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.id && (
              <p className="text-[12px] text-red-500">{errors.id.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium ">Business Name</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder="Enter business name"
              {...register("businessName")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.businessName && (
              <p className="text-[12px] text-red-500">
                {errors.businessName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium ">Email</label>
          <div className="col-span-3">
            <Input
              type="email"
              placeholder="Enter email address"
              {...register("email")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.email && (
              <p className="text-[12px] text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium ">Phone</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder="Enter phone number"
              {...register("phone")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.phone && (
              <p className="text-[12px] text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium ">Address</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder="Enter address"
              {...register("address")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.address && (
              <p className="text-[12px] text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium ">Total Products</label>
          <div className="col-span-3">
            <Input
              type="number"
              placeholder="Enter total products"
              {...register("totalProducts")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded
             focus-visible:border-[#DFE0E1] focus-visible:ring-0
             appearance-none
             [&::-webkit-inner-spin-button]:appearance-none
             [&::-webkit-outer-spin-button]:appearance-none"
            />
            {errors.totalProducts && (
              <p className="text-[12px] text-red-500">
                {errors.totalProducts.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium ">Completed Orders</label>
          <div className="col-span-3">
            <Input
              type="number"
              placeholder="Enter completed orders"
              {...register("completedOrders")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded
             focus-visible:border-[#DFE0E1] focus-visible:ring-0
             appearance-none
             [&::-webkit-inner-spin-button]:appearance-none
             [&::-webkit-outer-spin-button]:appearance-none"
            />
            {errors.completedOrders && (
              <p className="text-[12px] text-red-500">
                {errors.completedOrders.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium ">Canceled Orders</label>
          <div className="col-span-3">
            <Input
              type="number"
              placeholder="Enter canceled orders"
              {...register("canceledOrders")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded
             focus-visible:border-[#DFE0E1] focus-visible:ring-0
             appearance-none
             [&::-webkit-inner-spin-button]:appearance-none
             [&::-webkit-outer-spin-button]:appearance-none"
            />
            {errors.canceledOrders && (
              <p className="text-[12px] text-red-500">
                {errors.canceledOrders.message}
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
