import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select.tsx";
import { discountSchema, type DiscountFormValues } from "./DiscountFormZod.ts";
import { useFetchDiscountProduct } from "@/hooks/discount/useFetchDiscount.ts";
import { usePostProductDiscount } from "@/hooks/discount/usePostProductDiscount.ts";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  id: number;
  setAddOpen: Dispatch<SetStateAction<number | null>>;
};

export const ProductDiscountForm = ({ id, setAddOpen }: Props) => {
  const addDiscount = usePostProductDiscount();
  const { handleSubmit, control } = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema) as Resolver<DiscountFormValues>,
    mode: "onChange",
  });
  const onSubmit = (data: DiscountFormValues) => {
    addDiscount.mutate(
      {
        productIds: [id],
        discountId: data.discountId,
      },
      {
        onSuccess: () => {
          setAddOpen(null);
        },
      },
    );
  };

  const discount = useFetchDiscountProduct();

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="sticky top-0 text-[24px] font-bold text-[#23272E] text-center bg-white pb-2 ">
          Add Discount
        </div>
        <div className="flex-1 overflow-auto ">
          <div className="grid grid-cols-4 gap-2 items-center  mt-5">
            <label className="col-span-1 font-small text-gray-700 whitespace-nowrap">
              Discount Name
            </label>
            <div className="col-span-3">
              <Controller
                name="discountId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Discount" />
                    </SelectTrigger>

                    <SelectContent>
                      {Array.isArray(discount.data) &&
                        discount.data.map((val) => (
                          <SelectItem
                            key={val.discountId}
                            value={String(val.discountId)}
                          >
                            {val.discountName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white pt-4 flex justify-center z-10">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
          >
            Save Discount
          </button>
        </div>
      </form>
    </div>
  );
};
