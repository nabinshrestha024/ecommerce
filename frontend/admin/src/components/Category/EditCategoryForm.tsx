import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Resolver } from "react-hook-form";
import {
  categorySchema,
  type CategoryFormValues,
} from "./AddCategoryZodValidation.ts";
import { Select } from "../Select/Select.tsx";
import { Input } from "@/ui/input.tsx";
import { useEditCategory } from "@/hooks/category/useEditCategory.ts";
import type { CategoryData } from "@/hooks/category/useFetchCategory.tsx";
import { useState } from "react";

type CategoryProps = {
  categoryData: CategoryData;
  onSave: (categoryData: CategoryFormValues) => void;
};

export const EditCategoryForm = ({ categoryData, onSave }: CategoryProps) => {
  const editCategory = useEditCategory();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      name: categoryData.name,
      description: categoryData.description,
      isFeatured: categoryData.isFeatured,
      isActive: categoryData.isActive,
      sortOrder: categoryData.sortOrder,
    },
    mode: "onChange",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const selectData = [
    {
      id: 1,
      value: "true",
      content: "true",
    },
    {
      id: 2,
      value: "false",
      content: "false",
    },
  ];

  const onSubmit = (data: CategoryFormValues) => {
    const updateCategory: CategoryData = {
      ...categoryData,
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      isFeatured: data.isFeatured,
      sortOrder: data.sortOrder,
      categoryImageURL: data.categoryImageURL || categoryData.categoryImageURL,
    };

    editCategory.mutate({
      categoryId: categoryData.categoryId,
      categoryData: updateCategory,
    });

    onSave(updateCategory);

    reset({
      name: updateCategory.name,
      description: updateCategory.description,
      sortOrder: updateCategory.sortOrder,
      isFeatured: updateCategory.isFeatured,
      isActive: updateCategory.isActive,
      categoryImageURL: updateCategory.categoryImageURL,
    });
  };

  return (
    <div className="flex justify-center overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="sticky top-0 text-[24px] font-bold text-[#23272E] text-center bg-white pb-2 ">
          Add Catgegory
        </div>
        <div className="flex-1 overflow-auto mt-5">
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className=" font-medium text-gray-700">Name</label>
            <div className="col-span-3">
              <Input
                type="text"
                placeholder=""
                {...register("name")}
                className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.name ? "border-red-500 focus-visible:border-red-500" : ""}`}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto mt-5">
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className=" font-medium text-gray-700">Description</label>
            <div className="col-span-3 ">
              <Input
                type="text"
                placeholder=""
                {...register("description")}
                className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.description ? "border-red-500 focus-visible:border-red-500" : ""}`}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto mt-5">
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className=" font-medium text-gray-700">Sort Order</label>
            <div className="col-span-3 ">
              <Input
                type="text"
                placeholder=""
                {...register("sortOrder")}
                className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.sortOrder ? "border-red-500 focus-visible:border-red-500" : ""}`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="col-span-1 font-medium text-gray-700">
            isFeatured
          </label>
          <div className="col-span-3">
            <Select
              selectData={selectData}
              triggerClassName="w-full border rounded-md px-3 py-2"
              itemClassName="cursor-pointer"
              onValueChange={(v) => setValue("isFeatured", v === "true")}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="col-span-1 font-medium text-gray-700">
            isActive
          </label>
          <div className="col-span-3">
            <Select
              defaultValue="true"
              selectData={selectData}
              triggerClassName="w-full border rounded-md px-3 py-2"
              itemClassName="cursor-pointer"
              onValueChange={(v) => setValue("isActive", v === "true")}
            />
          </div>
        </div>

        <Controller
          control={control}
          name="categoryImageURL"
          render={({ field }) => (
            <div className="grid grid-cols-4 gap-4 items-center mt-5">
              <label className="font-medium text-gray-700">Image</label>
              <div className="col-span-3 flex-1 gap-2">
                <Input
                  autoComplete="off"
                  type="file"
                  id="image"
                  accept="image/*"
                  name={field.name}
                  ref={field.ref}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
                {imagePreview && (
                  <div className="w-40 h-40 border overflow-hidden rounded">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {errors.categoryImageURL && (
                  <p className="text-[12px] text-red-500">
                    {errors.categoryImageURL.message as string}
                  </p>
                )}
              </div>
            </div>
          )}
        />
        <div className="sticky bottom-0 bg-white pt-4 flex justify-center z-10">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
          >
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
};
