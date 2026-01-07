import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input.tsx";
import {
  DiscountSchema,
  type DiscountFormValues,
} from "./DiscountZodValidation.ts";
import { useEditDicount } from "@/hooks/discount/useEditDiscount.ts";
import type { DiscountData } from "@/hooks/discount/useFetchDiscount.ts";

type Props = {
  discount: DiscountData;
  onSave: (discount: DiscountData) => void;
};

export const DiscountForm = ({ discount, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(DiscountSchema) as Resolver<DiscountFormValues>,
    defaultValues: {
      productId: discount.productId,
      percentage: discount.percentage,
      startDate: discount.startDate,
      endDate: discount.endDate,
      maxUsage: discount.maxUsage,
      perUserLimit: discount.perUserLimit,
    },
    mode: "onChange",
  });

  const editDiscount = useEditDicount();
  const onSubmit = (data: DiscountFormValues) => {
    const updatedDiscount: DiscountData = {
      ...discount,
      productId: data.productId,
      percentage: data.percentage,
      startDate: data.startDate,
      endDate: data.endDate,
      maxUsage: data.maxUsage,
      perUserLimit: data.perUserLimit,
    };

    editDiscount.mutate({
      discountId: discount.discountId,
      discountData: updatedDiscount,
    });

    onSave(updatedDiscount);

    reset({
      productId: updatedDiscount.productId,
      percentage: updatedDiscount.percentage,
      startDate: updatedDiscount.startDate,
      endDate: updatedDiscount.endDate,
      maxUsage: updatedDiscount.maxUsage,
      perUserLimit: updatedDiscount.perUserLimit,
    });
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Edit Discount
        </h2>

        <div className="grid grid-cols-4 gap-4  mt-5">
          <label className="font-medium text-gray-700">Product Id</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("productId")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.productId && (
              <p className="text-[12px] text-red-500 ">
                {errors.productId.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="col-span-1 font-medium text-gray-700">
            Percentage
          </label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("percentage")}
              maxLength={10}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.percentage && (
              <p className="text-[12px] text-red-500 ">
                {errors.percentage.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4  mt-5">
          <label className="font-medium text-gray-700">Max Usages</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("maxUsage")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.maxUsage && (
              <p className="text-[12px] text-red-500 ">
                {errors.maxUsage.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700">User Limit</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("perUserLimit")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.perUserLimit && (
              <p className="text-[12px] text-red-500 ">
                {errors.perUserLimit.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700 mt-2">Start Date</label>
          <div className="col-span-3">
            <Input
              type="date"
              placeholder=""
              {...register("startDate")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded resize-none focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.startDate && (
              <p className="text-[12px] text-red-500 ">
                {errors.startDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700 mt-2">End Date</label>
          <div className="col-span-3">
            <Input
              type="date"
              placeholder=""
              {...register("endDate")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded resize-none focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.endDate && (
              <p className="text-[12px] text-red-500 ">
                {errors.endDate.message}
              </p>
            )}
          </div>
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
