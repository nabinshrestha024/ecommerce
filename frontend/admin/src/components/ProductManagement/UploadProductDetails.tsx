import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card } from "../Card/Card";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { useGetCategories } from "@/hooks/product/useGetCategories";
import { Input } from "../Input/Input";

type ImageItem = {
  file: File;
  preview: string;
};

export const UploadProductDetails = forwardRef((_, ref) => {
  const { data } = useGetCategories();
  const categories = data?.items ?? [];
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [primaryImage, setPrimaryImage] = useState<number>(0);
  const [variants, setVariants] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = e.currentTarget.value.trim();
    if (!value || tags.includes(value)) {
      e.currentTarget.value = "";
      return;
    }
    const updatedTags = [...tags, value];
    setTags(updatedTags);
    setValue("tags", updatedTags, { shouldValidate: false });
    e.currentTarget.value = "";
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue("tags", updatedTags, { shouldValidate: false });
  };

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

  const handleAddVariant = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = e.currentTarget.value.trim();
    if (!value || variants.includes(value)) {
      e.currentTarget.value = "";
      return;
    }
    const updatedVariants = [...variants, value];
    setVariants(updatedVariants);
    setValue("variants", updatedVariants, { shouldValidate: false });
    e.currentTarget.value = "";
  };

  const handleRemoveVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
    setValue("variants", updatedVariants, { shouldValidate: false });
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
    <Card
      className="shadow-[0px_1px_3px_0px_#00000033] w-full h-auto py-4 sm:py-6 px-4 sm:px-6 rounded-xl"
      cardClassName="p-0 border-none shadow-none rounded-xl w-full"
    >
      <div className="font-bold text-[22px] leading-[26px] tracking-[0%]">
        Upload Product Details
      </div>
      <div className="flex flex-col mt-6 gap-8">
        <div className="flex flex-col ">
          <label htmlFor="productImage" className="block cursor-pointer">
            <div className="relative border border-gray-300 rounded-md p-2 flex text-left items-center justify-center">
              <span className="text-sm text-left">Upload Image</span>
            </div>
          </label>
          <input
            id="productImage"
            type="file"
            accept="image/*"
            multiple
            {...register("images", { onChange: handleFileChange })}
            className="hidden"
          />
          {errors.images && (
            <p className="text-sm text-red-500">
              {errors.images?.message as string}
            </p>
          )}
          {images.length > 0 && (
            <div className="grid grid-cols-3 mt-3 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.preview}
                    onClick={() => handleSetPrimaryImage(index)}
                    className={`h-40 w-full object-cover rounded-lg  cursor-pointer ${index === primaryImage ? "ring-2 ring-blue-500" : ""}`}
                  />
                  {index === primaryImage && (
                    <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Primary
                    </span>
                  )}
                  <div className="flex justify-center items-center rounded-full bg-red-500 absolute -top-1.5 -right-1.5">
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <X className="text-white h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-bold text-[22px] leading-[26px] tracking-[0%]">
            Categories
          </div>
          <div className="flex flex-col ">
            <label className="block text-sm font-medium">
              Product Categories
            </label>
            <select
              {...register("categoryId")}
              defaultValue=""
              className="w-full h-9 px-3 border mt-2 border-gray-300 bg-foreground-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            >
              <option value="" disabled>
                Select product categories...
              </option>
              {categories?.map(
                (category: { categoryId: number; name: string }) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ),
              )}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">
                {errors.categoryId?.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-bold text-[22px] leading-[26px] tracking-[0%]">
            Variants
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium">Variant Name</label>
            <Input
              type="text"
              placeholder="Enter variant name..."
              {...register("variantName")}
              className="w-full h-9 px-3 border mt-2 border-gray-300 bg-foreground-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            />
            {errors.variantName && (
              <p className="text-sm text-red-500">
                {errors.variantName?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col ">
            <label className="block text-sm font-medium">Variants</label>
            <Input
              type="text"
              placeholder="Enter variants..."
              onKeyDown={handleAddVariant}
              className="w-full h-9 px-3 border mt-2 border-gray-300 bg-foreground-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            />
            {errors.variants && (
              <p className="text-sm text-red-500">
                {errors.variants?.message as string}
              </p>
            )}
            {variants.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 mt-4 rounded-xl transition-colors shadow-md"
                  >
                    <span className="text-md font-medium truncate mr-1">
                      {variant}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="flex-0 bg-transparent hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col ">
            <label className="block text-sm font-medium">Tags</label>
            <Input
              type="text"
              placeholder="Enter tags for product..."
              onKeyDown={handleAddTag}
              className="w-full h-9 px-3 border mt-2 border-gray-300 bg-foreground-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            />
            {errors.tags && (
              <p className="text-sm text-red-500">
                {errors.tags?.message as string}
              </p>
            )}
            {tags.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 mt-4 rounded-xl transition-colors shadow-md"
                  >
                    <span className="text-md font-medium truncate mr-1">
                      {tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="shrink-0 bg-transparent hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
});
