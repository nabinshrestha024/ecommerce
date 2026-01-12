import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  customerSchema,
  type CustomerFormValues,
} from "../Customer/CustomerFormZod.ts";
import { Input } from "../Input/Input.tsx";
import { useEditUser } from "@/hooks/user/useEdit.ts";
import type { Person } from "./CustomerProfile.tsx";

type Props = {
  customer: Person;
  onSave: (customer: Person) => void;
};

export const CustomerForm = ({ customer, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema) as Resolver<CustomerFormValues>,
    defaultValues: {
      name: customer.fullName,
      address: customer.address,
      phone: customer.phone,
      role: customer.isActive ? "true" : "false",
    },
    mode: "onChange",
  });

  const editUser = useEditUser();
  const onSubmit = (data: CustomerFormValues) => {
    const updatedUser: Person = {
      ...customer,
      fullName: data.name,
      phone: data.phone,
      address: data.address,
      isActive: data.role === "true",
    };

    editUser.mutate({
      userid: customer.userid,
      userData: updatedUser,
    });

    onSave(updatedUser);

    reset({
      name: updatedUser.fullName,
      phone: updatedUser.phone,
      address: updatedUser.address,
      role: updatedUser.role ? "true" : "false",
    });
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Edit Customer
        </h2>

        <div className="grid grid-cols-4 items-center gap-4  mt-5">
          <label className="font-medium text-gray-700">Name</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("name")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.name ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Phone</label>
          <div className="col-span-3">
            <Input
              type="phone"
              placeholder=""
              {...register("phone")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.phone ? "border-red-500 focus-visible:border-red-500" : ""}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Address</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("address")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.address ? "border-red-500 focus-visible:border-red-500" : ""}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="col-span-1 font-medium text-gray-700">Role</label>

          <div className="col-span-3 flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("role")}
                className="accent-blue-600"
              />
              <span>True</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("role")}
                className="accent-blue-600"
              />
              <span>False</span>
            </label>
          </div>

          {errors.role && (
            <p className="col-span-4 text-[12px] text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};
