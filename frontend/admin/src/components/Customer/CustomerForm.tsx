import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  customerSchema,
  type CustomerFormValues,
} from "../Customer/CustomerFormZod.ts";
import { Input } from "../Input/Input.tsx";
import { useEditUser } from "@/hooks/user/useEdit.ts";

interface Person {
  userid: number;
  email: string;
  fullName: string;
  passwordHash: string;
  status: number;
  profileImageUrl: string | null;
  phone: string;
  address: string;
  city: string;
  role: boolean;
  refreshToken: string | null;
  accessToken: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userProfile: string;
  socialLinks: string;
  orders: string;
}
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
      password: customer.passwordHash,
      address: customer.address,
      phone: customer.phone,
      city: customer.city,
      isActive: customer.isActive ? "true" : "false",
    },
    mode: "onChange",
  });

  const editUser = useEditUser();
  const onSubmit = (data: CustomerFormValues) => {
    const updatedUser: Person = {
      ...customer,
      fullName: data.name,
      phone: data.phone,
      passwordHash: data.password,
      address: data.address,
      city: data.city,
      isActive: data.isActive === "true",
    };

    editUser.mutate({
      userid: customer.userid,
      userData: updatedUser,
    });

    onSave(updatedUser);

    reset({
      name: updatedUser.fullName,
      phone: updatedUser.phone,
      password: data.password,
      address: updatedUser.address,
      city: updatedUser.city,
      isActive: updatedUser.isActive ? "true" : "false",
    });
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Edit Customer
        </h2>

        <div className="grid grid-cols-4 gap-4  mt-5">
          <label className="font-medium text-gray-700">Name</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("name")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.name && (
              <p className="text-[12px] text-red-500 ">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="col-span-1 font-medium text-gray-700">
            Password
          </label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("password")}
              maxLength={10}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.password && (
              <p className="text-[12px] text-red-500 ">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4  mt-5">
          <label className="font-medium text-gray-700">Phone Number</label>
          <div className="col-span-3">
            <Input
              type="phone"
              placeholder=""
              {...register("phone")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.phone && (
              <p className="text-[12px] text-red-500 ">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700">Address</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("address")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.address && (
              <p className="text-[12px] text-red-500 ">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700 mt-2">City</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("city")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded resize-none focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.city && (
              <p className="text-[12px] text-red-500 ">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="col-span-1 font-medium text-gray-700">
            isActive
          </label>

          <div className="col-span-3 flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("isActive")}
                className="accent-blue-600"
              />
              <span>True</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("isActive")}
                className="accent-blue-600"
              />
              <span>False</span>
            </label>
          </div>

          {errors.isActive && (
            <p className="col-span-4 text-[12px] text-red-500">
              {errors.isActive.message}
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
