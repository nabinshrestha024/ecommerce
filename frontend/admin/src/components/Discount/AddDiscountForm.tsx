import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input.tsx";
import { Select } from "../Select/Select.tsx";
import { usePostDiscount } from "@/hooks/discount/usePostDiscount.ts";
import { Button } from "@/ui/button.tsx";
import {
  DiscountAddSchema,
  type DiscountAddFormValues,
} from "./AddDiscountZodValidation.ts";
import { useFetchProduct } from "@/hooks/product/useFetchProducts.ts";

export const AddDiscountForm = () => {
  const product = useFetchProduct();
  console.log("Product:", product);

  const selectData = [
    { id: 1, value: "Percentage", content: "Percentage" },
    { id: 2, value: "Flat", content: "Flat" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DiscountAddFormValues>({
    resolver: zodResolver(DiscountAddSchema) as Resolver<DiscountAddFormValues>,
    mode: "onChange",
  });

  const addDiscount = usePostDiscount();

  const onSubmit = (data: DiscountAddFormValues) => {
    addDiscount.mutate(data);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Add Discount
        </h2>

        <div className="grid grid-cols-4 items-center gap-5 mt-5">
          <label className="col-span-1 font-medium text-gray-700 whitespace-nowrap">
            Discount Name
          </label>
          <div className="col-span-3">
            <Input
              type="text"
              {...register("discountName")}
              maxLength={10}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.discountName ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center  gap-5 mt-5">
          <label className="col-span-1 font-medium text-gray-700 whitespace-nowrap">
            Discount Type
          </label>
          <div className="col-span-3">
            <Select
              selectData={selectData}
              triggerClassName={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.discountType ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              itemClassName="cursor-pointer"
              onValueChange={(d) =>
                setValue("discountType", d, { shouldValidate: true })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center  gap-5 mt-5">
          <label className="col-span-1 font-medium text-gray-700 whitespace-nowrap">
            Discount Value
          </label>
          <div className="col-span-3 ">
            <Input
              type="text"
              {...register("discountValue")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.discountValue ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center  gap-5 mt-5">
          <label className="col-span-1 font-medium text-gray-700 whitespace-nowrap">
            Start Date
          </label>
          <div className="col-span-3">
            <Input
              type="date"
              {...register("startDate")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.startDate ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center  gap-5 mt-5">
          <label className="col-span-1 font-medium text-gray-700 whitespace-nowrap">
            End Date
          </label>
          <div className="col-span-3">
            <Input
              type="date"
              {...register("endDate")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.endDate ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
          >
            Save Product
          </Button>
        </div>
      </form>
    </div>
  );
};
