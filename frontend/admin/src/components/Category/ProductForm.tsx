import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type ProductFormValues,
} from "../Category/ProductZodVAlidation.tsx";
import { Input } from "../Input/Input.tsx";
import { useEditProduct } from "@/hooks/product/useEditProduct.ts";
import { useState } from "react";

type ProductData = {
  productId: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: number;
  stockQuantity: number;
  primaryImageUrl: string;
  isActive: boolean;
  categoryId: number;
  primaryIndex: number;
};

type Props = {
  product: ProductData;
  onSave: (product: ProductData) => void;
};

export const ProductForm = ({ product, onSave }: Props) => {
  const editProduct = useEditProduct();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name: product.name,
      productId: product.productId,
      categoryId: product.categoryId,
      stockQuantity: product.stockQuantity,
      description: product.description || "",
      shortDescription: product.shortDescription || "",
      slug: product.slug,
      price: product.price,
      isActive: true,
      primaryIndex: product.primaryIndex || 0,
    },
    mode: "onChange",
  });
  const onSubmit = (data: ProductFormValues) => {
    const formData = new FormData();

    formData.append("productId", String(product.productId));
    formData.append("categoryId", String(data.categoryId));
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDescription || "");
    formData.append("price", String(data.price));
    formData.append("stockQuantity", String(data.stockQuantity));
    formData.append("isActive", String(data.isActive));
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
          onSave({ ...product, ...data });
          reset(data);
          setImagePreview("");
        },
      },
    );
  };
  const [imagePreview, setImagePreview] = useState<string>("");
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Edit Product
        </h2>

        <div className="grid grid-cols-4 gap-4 items-center ">
          <label className="col-span-1 font-medium text-gray-700">
            Product ID
          </label>
          <div className="col-span-3">
            <Input
              type="number"
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
          <label className="font-medium text-gray-700">Category ID</label>
          <div className="col-span-3">
            <Input
              type="number"
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
          <label className="font-medium text-gray-700">Product Name</label>
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

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Slug</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("slug")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.slug && (
              <p className="text-[12px] text-red-500 ">{errors.slug.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700 mt-2">Description</label>
          <div className="col-span-3">
            <Input
              type="textarea"
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

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700 mt-2">
            Short Description
          </label>
          <div className="col-span-3">
            <Input
              type="textarea"
              placeholder=""
              {...register("shortDescription")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded resize-none focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.shortDescription && (
              <p className="text-[12px] text-red-500 ">
                {errors.shortDescription.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Price</label>
          <div className="col-span-3">
            <Input
              type="number"
              placeholder=""
              {...register("price")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.price && (
              <p className="text-[12px] text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Stock Quantity</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("stockQuantity")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.stockQuantity && (
              <p className="text-[12px] text-red-500 ">
                {errors.stockQuantity.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Is Active</label>
          <div className="col-span-3 flex items-center gap-2">
            <Input type="checkbox" placeholder="" {...register("isActive")} />
            <span className="text-sm text-gray-600">Product is active</span>
          </div>
        </div>

        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Image</label>

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

              <input
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

              {errors.image && (
                <p className="text-red-500">{errors.image.message as string}</p>
              )}
            </div>
          )}
        />

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
