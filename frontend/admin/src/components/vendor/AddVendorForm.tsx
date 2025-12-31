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
        <div>
          <label className="block text-sm font-medium ">Company Name</label>
          <input
            type="text"
            placeholder="Enter company name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Contact Person</label>
          <input
            type="text"
            placeholder="Enter contact person"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            {...register("contactPerson")}
          />
          {errors.contactPerson && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contactPerson.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Phone</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Address</label>
          <input
            type="text"
            placeholder="Enter address"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            variant={"default"}
            className="px-4 py-4  text-white rounded-md "
          >
            Add Vendor
          </Button>
        </div>
      </div>
    </form>
  );
};
