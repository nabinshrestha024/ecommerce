import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddVendorFormSchema,
  type AddVendorFormValues,
} from "./AddVendorFormSchema.zod.ts";

export const AddVendorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddVendorFormValues>({
    resolver: zodResolver(AddVendorFormSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<AddVendorFormValues> = (data) => {
    console.log("Form Data:", data);
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
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.companyName.message}
            </p>
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
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Vendor
          </button>
        </div>
      </div>
    </form>
  );
};
