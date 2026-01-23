import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddVendorFormSchema,
  type AddVendorFormValues,
} from "./AddVendorFormSchema.zod.ts";
import { useCreateVendor } from "@/hooks/vendor/useCreateVendor.ts";
import { Button } from "@/ui/button.tsx";
export const AddVendorForm = () => {
  const { mutate } = useCreateVendor();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddVendorFormValues>({
    resolver: zodResolver(AddVendorFormSchema),
    defaultValues: {
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<AddVendorFormValues> = (
    data: AddVendorFormValues,
  ) => {
    mutate({
      name: data.name,
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="sticky top-0 text-[24px] font-bold text-[#23272E] text-center bg-white pb-2 ">
          Add Vendor
        </div>
        <div className="grid grid-cols-4 gap-10 items-center  mt-5">
          <label className="col-span-1 font-small text-gray-700 whitespace-nowrap">
            Company Name
          </label>
          <div className="col-span-3">
            <input
              type="text"
              placeholder="Enter company name"
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.name ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              {...register("name")}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-10  items-center  mt-5">
          <label className="col-span-1 font-small text-gray-700 whitespace-nowrap">
            Contact Person
          </label>
          <div className="col-span-3">
            <input
              type="text"
              placeholder="Enter contact person"
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.contactPerson ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              {...register("contactPerson")}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-10  items-center  mt-5">
          <label className="col-span-1 font-small text-gray-700 whitespace-nowrap">
            Email
          </label>
          <div className="col-span-3">
            <input
              type="email"
              placeholder="Enter email"
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.email ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              {...register("email")}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-10 items-center  mt-5">
          <label className="block text-sm font-medium w-36 whitespace-nowrap">
            Phone
          </label>
          <div className="col-span-3">
            <input
              type="tel"
              placeholder="Enter phone number"
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.phone ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              {...register("phone")}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-10 items-center  mt-5">
          <label className="col-span-1 font-small text-gray-700 whitespace-nowrap">
            Address
          </label>
          <div className="col-span-3">
            <input
              type="text"
              placeholder="Enter address"
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.address ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              {...register("address")}
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            variant={"default"}
            className="px-4 py-4  text-white rounded-md "
          >
            Save Vendor
          </Button>
        </div>
      </div>
    </form>
  );
};
