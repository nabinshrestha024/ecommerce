import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input.tsx";
import type { Variant } from "./CategoryDetails.tsx";
import { variantSchema, type VariantFormValues } from "./VariantFormZod.ts";
import { useEditVariant } from "@/hooks/variants/useEditVariant.tsx";
import { useParams } from "react-router-dom";

type Props = {
  variant: Variant;
  onSave: () => void;
};

export const VariantForm = ({ variant, onSave }: Props) => {
  const params = useParams();
  const productId = Number(params.id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema) as Resolver<VariantFormValues>,
    defaultValues: {
      price: variant.price,
      stockQuantity: variant.stockQuantity,
      isActive: variant.isActive ? "true" : "false",
    },
    mode: "onChange",
  });

  const editVariant = useEditVariant();
  const onSubmit = (data: VariantFormValues) => {
    console.log("data", data);
    const updatedVariant: Variant = {
      ...variant,
      price: data.price,
      stockQuantity: data.stockQuantity,
      isActive: data.isActive === "true",
    };

    editVariant.mutate(
      {
        variantId: variant.variantId,
        productId: productId,
        variantData: updatedVariant,
      },
      {
        onSuccess: () => {
          onSave();
        },
      },
    );
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Edit Variant
        </h2>

        <div className="grid grid-cols-4 items-center gap-4  mt-5">
          <label className="font-medium text-gray-700">Price</label>
          <div className="col-span-3">
            <Input
              type="number"
              placeholder=""
              {...register("price")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.price ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1] "} no-spinner`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Stock Quantity</label>
          <div className="col-span-3">
            <Input
              type="number"
              placeholder=""
              {...register("stockQuantity")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.stockQuantity ? "border-red-500 focus-visible:border-red-500" : ""} no-spinner`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="col-span-1 font-medium text-gray-700">
            Is Active
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
