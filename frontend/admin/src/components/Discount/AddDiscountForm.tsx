import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input.tsx";
import { Select } from "../Select/Select.tsx";
import { usePostDiscount } from "@/hooks/discount/usePostDiscount.ts";
import { Button } from "@/ui/button.tsx";
import { Dialog } from "../Dialog/Dialog.tsx";
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
    watch,
  } = useForm<DiscountAddFormValues>({
    resolver: zodResolver(DiscountAddSchema) as Resolver<DiscountAddFormValues>,
    mode: "onChange",
    defaultValues: {
      productIds: [],
      variantIds: [],
    },
  });

  const productIds = watch("productIds") || [];
  const variantIds = watch("variantIds") || [];

  const addDiscount = usePostDiscount();

  const onSubmit = (data: DiscountAddFormValues) => {
    addDiscount.mutate(data);
  };

  const handleProductToggle = (productId: number, variantId: number) => {
    const productExists = productIds.includes(productId);
    const variantExists = variantIds.includes(variantId);

    if (productExists && variantExists) {
      setValue(
        "productIds",
        productIds.filter((id) => id !== productId),
        { shouldValidate: true },
      );

      setValue(
        "variantIds",
        variantIds.filter((id) => id !== variantId),
        { shouldValidate: true },
      );
    } else {
      setValue("productIds", [...productIds, productId], {
        shouldValidate: true,
      });

      setValue("variantIds", [...variantIds, variantId], {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Add Discount
        </h2>

        {/* Discount Name */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="col-span-1 font-medium text-gray-700">
            Discount Name
          </label>
          <div className="col-span-3">
            <Input
              type="text"
              {...register("discountName")}
              maxLength={10}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.discountName && (
              <p className="text-xs text-red-500">
                {errors.discountName.message}
              </p>
            )}
          </div>
        </div>

        {/* Discount Type */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700">Discount Type</label>
          <div className="col-span-3">
            <Select
              selectData={selectData}
              triggerClassName="w-full border rounded-md px-3 py-2"
              itemClassName="cursor-pointer"
              onValueChange={(d) =>
                setValue("discountType", d, { shouldValidate: true })
              }
            />
          </div>
        </div>

        {/* Discount Value */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700">Discount Value</label>
          <div className="col-span-3">
            <Input
              type="text"
              {...register("discountValue")}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.discountValue && (
              <p className="text-xs text-red-500">
                {errors.discountValue.message}
              </p>
            )}
          </div>
        </div>

        {/* Start Date */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700">Start Date</label>
          <div className="col-span-3">
            <Input
              type="date"
              {...register("startDate")}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.startDate && (
              <p className="text-xs text-red-500">{errors.startDate.message}</p>
            )}
          </div>
        </div>

        {/* End Date */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700">End Date</label>
          <div className="col-span-3">
            <Input
              type="date"
              {...register("endDate")}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.endDate && (
              <p className="text-xs text-red-500">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        {/* Product & Variant Selection */}
        <Dialog
          triggerContent={
            <div className="flex justify-center">
              <Button type="submit" className="bg-green-600 mt-5">
                Next
              </Button>
            </div>
          }
        >
          <div className="flex flex-col gap-3 mt-5">
            <label className="font-medium text-gray-700">Select Products</label>

            <div className="p-3 space-y-2">
              {product.data?.items
                ?.filter((prod) => prod.variants && prod.variants.length > 0)
                .map((prod) => {
                  const variantId = prod.variants[0].variantId;
                  const checked = productIds.includes(prod.productId);

                  return (
                    <label
                      key={prod.productId}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          handleProductToggle(prod.productId, variantId)
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{prod.name}</span>
                    </label>
                  );
                })}

              {errors.productIds && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.productIds.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="bg-green-600 mt-5">
                Add Discount
              </Button>
            </div>
          </div>
        </Dialog>
      </form>
    </div>
  );
};
