import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type ProductFormValues,
} from "../Category/ProductZodVAlidation.tsx";
import { Input } from "../Input/Input.tsx";

interface Person {
  id?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  name?: string;
  email?: string;
  registration?: string;
  lastPurchase?: string;
  orderCount?: string;
  totalSpend?: string;
  status?: string;
}

export const CustomerForm = ({ customer }: { customer: Person }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Form Data:", data);
    reset();
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
              {...register("productId")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.productId && (
              <p className="text-[12px] text-red-500 ">
                {errors.productId.message}
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
              {...register("categoryId")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.categoryId && (
              <p className="text-[12px] text-red-500 ">
                {errors.categoryId.message}
              </p>
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
              {...register("name")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.name && (
              <p className="text-[12px] text-red-500 ">{errors.name.message}</p>
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
              {...register("brand")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.brand && (
              <p className="text-[12px] text-red-500 ">
                {errors.brand.message}
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
              {...register("description")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded resize-none focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.description && (
              <p className="text-[12px] text-red-500 ">
                {errors.description.message}
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
