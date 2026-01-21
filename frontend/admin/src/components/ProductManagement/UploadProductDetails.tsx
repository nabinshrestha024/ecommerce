"use client";

import type React from "react";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card } from "@/ui/card";
import { useFormContext, Controller } from "react-hook-form";
import { X, Upload } from "lucide-react";
import { useGetCategories } from "@/hooks/product/useGetCategories";
import { FormSection } from "./FormSection";
import { useGetAttributes } from "@/hooks/attribute/useGetAttribute";
import { Checkbox } from "@/ui/checkbox";

type ImageItem = {
  file: File;
  preview: string;
};

type AttributeItem = {
  id?: number;
  name: string;
};

export const UploadProductDetails = forwardRef((_, ref) => {
  const { data } = useGetCategories();
  const { data: attributesData } = useGetAttributes();
  const categories = data?.items ?? [];
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [primaryImage, setPrimaryImage] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const imageItems = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => {
      const updated = [...prev, ...imageItems];
      setValue(
        "images",
        updated.map((i) => i.file),
        { shouldValidate: true },
      );
      setValue("primaryIndex", primaryImage, { shouldValidate: false });
      return updated;
    });
  };

  const handleDeleteImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      setValue(
        "images",
        updated.map((i) => i.file),
        { shouldValidate: true },
      );
      if (updated.length === 0) {
        setValue("primaryIndex", undefined, { shouldValidate: false });
      }
      return updated;
    });
    if (index === primaryImage) {
      setPrimaryImage(0);
    } else if (index < primaryImage) {
      setPrimaryImage((prev) => prev - 1);
    }
  };

  const handleSetPrimaryImage = (index: number) => {
    setPrimaryImage(index);
    setValue("primaryIndex", index, { shouldValidate: false });
  };

  useImperativeHandle(ref, () => ({
    resetImages: () => {
      setImages([]);
      setPrimaryImage(0);
      setValue("images", [], { shouldValidate: false });
      setValue("primaryIndex", undefined, { shouldValidate: false });
    },
  }));

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  return (
    <Card className="w-full rounded-lg p-6">
      <h1 className="text-2xl font-bold text-foreground">Product Details</h1>

      <div className="flex flex-col gap-8">
        <FormSection title="Images">
          <div className="flex flex-col gap-4">
            <label htmlFor="productImage" className="block cursor-pointer">
              <div
                className={`relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-colors ${
                  errors.images
                    ? "border-destructive bg-destructive/5"
                    : "border-input bg-secondary/30 hover:border-primary hover:bg-secondary/50"
                }`}
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    Click to upload images
                  </p>
                </div>
              </div>

              {errors.images && (
                <p className="text-xs text-destructive">
                  {errors.images.message as string}
                </p>
              )}
            </label>
            <input
              id="productImage"
              type="file"
              accept="image/*"
              multiple
              {...register("images", { onChange: handleFileChange })}
              className="hidden"
            />

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.preview || "/placeholder.svg"}
                      alt={`Product preview ${index + 1}`}
                      onClick={() => handleSetPrimaryImage(index)}
                      className={`aspect-square w-full cursor-pointer rounded-lg object-cover transition-all ${
                        index === primaryImage
                          ? "ring-2 ring-primary"
                          : "ring-1 ring-input group-hover:ring-primary"
                      }`}
                    />
                    {index === primaryImage && (
                      <span className="absolute bottom-1 left-1 rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        Primary
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow-sm transition-transform hover:scale-110"
                      aria-label={`Delete image ${index + 1}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FormSection>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            Product Category <span className="text-destructive">*</span>
          </h2>
          <select
            id="categoryId"
            {...register("categoryId")}
            defaultValue=""
            className={`rounded-md border-2 bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.categoryId ? "border-destructive" : "border-input"
            }`}
          >
            <option value="" disabled className="text-muted-foreground">
              Select a category...
            </option>
            {categories?.map(
              (category: { categoryId: number; name: string }) => (
                <option
                  key={category.categoryId}
                  value={category.categoryId}
                  className="text-foreground bg-background "
                >
                  {category.name}
                </option>
              ),
            )}
          </select>
        </div>

        <FormSection title="Attributes">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {attributesData?.map((item: AttributeItem) => (
              <div
                key={item.id || item.name}
                className="flex items-center gap-2"
              >
                <Controller
                  control={control}
                  name="attributes"
                  render={({ field }) => {
                    const current: string[] = field.value || [];
                    const checked = current.includes(item.name);
                    return (
                      <>
                        <Checkbox
                          id={`attr-${item.name}`}
                          checked={checked}
                          onClick={() => {
                            if (checked) {
                              field.onChange(
                                current.filter((v) => v !== item.name),
                              );
                            } else {
                              field.onChange([...current, item.name]);
                            }
                          }}
                          className="border-[#4EA764] data-[state=checked]:bg-[#4EA764] data-[state=checked]:border-[#4EA764] data-[state=checked]:text-white"
                        />
                        <label
                          htmlFor={`attr-${item.name}`}
                          className="text-sm font-medium cursor-pointer text-foreground"
                        >
                          {item.name}
                        </label>
                      </>
                    );
                  }}
                />
              </div>
            ))}
          </div>
          {errors.attributes && (
            <p className="text-xs text-destructive">
              {errors.attributes?.message as string}
            </p>
          )}
        </FormSection>
      </div>
    </Card>
  );
});

UploadProductDetails.displayName = "UploadProductDetails";
