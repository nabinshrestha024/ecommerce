import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  customerSchema,
  type CustomerFormValues,
} from "../Customer/CustomerFormZod.ts";
import { Input } from "../Input/Input.tsx";

interface Person {
  id: string;
  name: string;
  phone: string;
  orderCount: string;
  totalSpend: string;
  status: string;
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
    resolver: zodResolver(customerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: CustomerFormValues) => {
    console.log("Form Data:", data);
    const updatedProduct: Person = {
      ...customer,
      ...data,
    };
    onSave(updatedProduct);
    reset(updatedProduct);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Edit Customer
        </h2>

        <div className="grid grid-cols-4 gap-4 items-center ">
          <label className="col-span-1 font-medium text-gray-700">
            Customer ID
          </label>
          <div className="col-span-3">
            <Input
              type="text"
              defaultValue={customer.id}
              placeholder=""
              {...register("customerId")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.customerId && (
              <p className="text-[12px] text-red-500 ">
                {errors.customerId.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Name</label>
          <div className="col-span-3">
            <Input
              type="text"
              defaultValue={customer.name}
              placeholder=""
              {...register("name")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.name && (
              <p className="text-[12px] text-red-500 ">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Phone Number</label>
          <div className="col-span-3">
            <Input
              type="phone"
              defaultValue={customer.phone}
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

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Order Count</label>
          <div className="col-span-3">
            <Input
              type="text"
              defaultValue={customer.orderCount}
              placeholder=""
              {...register("orderCount")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.orderCount && (
              <p className="text-[12px] text-red-500 ">
                {errors.orderCount.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700 mt-2">Total Spend</label>
          <div className="col-span-3">
            <Input
              type="text"
              defaultValue={customer.totalSpend}
              placeholder=""
              {...register("totalSpend")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded resize-none focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.totalSpend && (
              <p className="text-[12px] text-red-500 ">
                {errors.totalSpend.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};
