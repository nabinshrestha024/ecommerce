import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type ProductFormValues,
} from "./ProductZodVAlidation.tsx";
import { useEditProduct } from "@/hooks/product/useEditProduct.ts";
import type { ProductRes } from "@/hooks/product/useProduct.ts";
import { useState } from "react";
import { Input } from "@/ui/input.tsx";
import { Input as Inp } from "@/components/Input/Input.tsx";
import { useFetchCategory } from "@/hooks/category/useFetchCategory.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select.tsx";

type Props = {
  product: ProductRes;
  onSave: () => void;
};

export const ProductForm = ({ product, onSave }: Props) => {
  const editProduct = useEditProduct();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name: product.name,
      categoryId: product.categoryId,
      description: product.description || "",
      shortDescription: product.shortDescription || "",
      isActive: true,
      primaryIndex: product.primaryIndex || 0,
    },
    mode: "onChange",
  });
  const onSubmit = (data: ProductFormValues) => {
    const formData = new FormData();

    formData.append("categoryId", String(data.categoryId));
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDescription || "");
    formData.append("isActive", String(true));
    formData.append("primaryIndex", String(data.primaryIndex));

    if (data.image) {
      formData.append("image", data.image);
    }

    editProduct.mutate(
      {
        productId: product.productId,
        productData: formData,
      },
      {
        onSuccess: () => {
          onSave();
          setImagePreview("");
        },
      },
    );
  };

  const categories = useFetchCategory(1, 50);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="sticky top-0 text-[24px] font-bold text-[#23272E] text-center bg-white pb-2 ">
          Edit Product
        </div>
        <div className="flex-1 overflow-auto ">
          <div className="grid grid-cols-4 gap-4 items-center  mt-5">
            <label className="font-medium text-gray-700">Category</label>
            <div className="col-span-3">
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.data?.map((val) => (
                        <SelectItem
                          key={val.categoryId}
                          value={String(val.categoryId)}
                        >
                          {val.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4 mt-5">
            <label className="font-medium text-gray-700">Name</label>
            <div className="col-span-3">
              <Inp
                type="text"
                placeholder=""
                {...register("name")}
                className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.name ? "border-red-500 focus-visible:border-red-500" : ""}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4 mt-5">
            <label className="font-medium text-gray-700 ">Description</label>
            <div className="col-span-3">
              <Inp
                type="textarea"
                placeholder=""
                {...register("description")}
                className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.description ? "border-red-500 focus-visible:border-red-500" : ""}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4 mt-5">
            <label className="font-medium text-gray-700 mt-2">Short Desc</label>
            <div className="col-span-3">
              <Inp
                type="textarea"
                placeholder=""
                {...register("shortDescription")}
                className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.shortDescription ? "border-red-500 focus-visible:border-red-500" : ""}`}
              />
            </div>
          </div>

          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <div className="grid grid-cols-4 items-center gap-4  mt-5">
                <label className="font-medium text-gray-700">Image</label>

                <div className="col-span-3">
                  <Input
                    autoComplete="off"
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {imagePreview && (
                    <div className="w-48 h-48 border overflow-hidden rounded">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <div className="sticky bottom-0 bg-white pt-4 flex justify-center z-10">
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
