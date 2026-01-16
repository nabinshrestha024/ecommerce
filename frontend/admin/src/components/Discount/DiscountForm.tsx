import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input.tsx";
import {
  DiscountSchema,
  type DiscountFormValues,
} from "./DiscountZodValidation.ts";
import { useEditDicount } from "@/hooks/discount/useEditDiscount.ts";
import type { DiscountData } from "@/hooks/discount/useFetchDiscount.ts";
import { Select } from "../Select/Select.tsx";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  discount: DiscountData;
  setOpen: Dispatch<SetStateAction<number | null>>;
};

export const DiscountForm = ({ discount, setOpen }: Props) => {
  const {
    discountId,
    discountType,
    endDate,
    discountName,
    discountValue,
    startDate,
  } = discount;
  const selectData = [
    {
      id: 1,
      value: "Percentage",
      content: "Percentage",
    },
    {
      id: 2,
      value: "Flat",
      content: "Flat",
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(DiscountSchema) as Resolver<DiscountFormValues>,
    defaultValues: {
      discountId,
      discountValue,
      startDate: startDate.split("T")[0],
      endDate: endDate.split("T")[0],
      discountType,
      discountName,
    },
    mode: "onChange",
  });

  const editDiscount = useEditDicount();
  const onSubmit = (data: DiscountFormValues) => {
    const {
      discountId,
      discountType,
      endDate,
      discountName,
      discountValue,
      startDate,
    } = data;

    const updatedDiscount: DiscountData = {
      discountId,
      discountValue,
      startDate,
      endDate,
      discountType,
      discountName,
      isActive: true,
    };

    editDiscount.mutate(
      {
        discountId: discount.discountId,
        discountData: updatedDiscount,
      },
      {
        onSuccess: () => {
          setOpen(null);
        },
      },
    );
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Edit Discount
        </h2>

        <div className="grid grid-cols-4 gap-4  mt-5">
          <label className="font-medium text-gray-700">Discount Id</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("discountId")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.discountId ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="col-span-1 font-medium text-gray-700 whitespace-nowrap">
            Discount Name
          </label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("discountName")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.discountName ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4  mt-5">
          <label className="col-span-1 font-medium text-gray-700 whitespace-nowrap">
            Discount Type
          </label>
          <div className="col-span-3">
            <Select
              defaultValue={discountType}
              selectData={selectData}
              triggerClassName="w-full border rounded-md px-3 py-2"
              itemClassName="cursor-pointer"
              onValueChange={(d) => setValue("discountType", d)}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="col-span-1 font-medium text-gray-700 whitespace-nowrap">
            Discount Value
          </label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("discountValue")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.discountValue ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700 whitespace-nowrap">
            Start Date
          </label>
          <div className="col-span-3">
            <Input
              type="date"
              placeholder=""
              {...register("startDate")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.startDate ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700 mt-2">End Date</label>
          <div className="col-span-3">
            <Input
              type="date"
              placeholder=""
              {...register("endDate")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.endDate ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
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
