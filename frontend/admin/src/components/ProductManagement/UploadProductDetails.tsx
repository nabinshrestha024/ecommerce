import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card } from "../Card/Card";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { useGetCategories } from "@/hooks/product/useGetCategories";
import { useGetAttributes } from "@/hooks/attribute/useGetAttribute";

type ImageItem = {
  file: File;
  preview: string;
};

export const UploadProductDetails = forwardRef((_, ref) => {
  const { data } = useGetCategories();
  const attributesData = useGetAttributes();
  const categories = data?.items ?? [];
  const {
    register,
    setValue,
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
            <div
              className={`relative border border-gray-300 rounded-md p-2 flex text-left items-center justify-center ${errors.images ? "border-red-500" : ""}`}
            >
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
              className={`w-full h-9 px-3 border mt-2 border-gray-300 bg-foreground-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                errors.categoryId ? "border-red-500" : ""
              }`}
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
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-bold text-[22px] leading-[26px] tracking-[0%]">
            Attributes
          </div>
          <div className="grid grid-cols-4">
            {attributesData.data?.map((item) => {
              return (
                <div className="flex items-center gap-2 p-2 pb-0 ">
                  <input
                    type="checkbox"
                    value={item.name}
                    {...register("attributes")}
                    className="h-4 w-4 border-gray-300 rounded cursor-pointer accent-[#01a73e] dark:accent-emerald-600"
                  />
                  <label className="text-sm font-medium cursor-pointer">
                    {item.name}
                  </label>
                </div>
              );
            })}
          </div>
          {errors.attributes && (
            <p className="text-sm text-red-500">
              {errors.attributes?.message as string}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
});
