import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";

type ImageItem = {
  file: File;
  preview: string;
};

export const UploadProductDetails = () => {
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
    setImages((prev) => [...prev, ...imageItems]);
    setValue("primaryIndex", primaryImage, { shouldValidate: false });
  };
  const handleDeleteImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages((prev) => prev.filter((_, i) => i !== index));
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
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="productImage" className="block cursor-pointer">
              <div className="relative border border-gray-300 rounded-md p-2 flex text-left items-center justify-center">
                <span className=" text-sm text-left">Upload Image</span>
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
              <p className="text-sm text-red-500 mt-1">
                {errors.images?.message as string}
              </p>
            )}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.preview}
                    onClick={() => handleSetPrimaryImage(index)}
                    className={`h-32 w-full object-cover rounded-md cursor-pointer ${index == primaryImage ? "ring-2 ring-blue-500" : ""}`}
                  />
                  {index === primaryImage && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Primary
                    </span>
                  )}
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-1 right-0"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="font-bold text-[22px] leading-[26px] tracking-[0%]">
            Categories
          </div>
          <div className="flex flex-col mt-6 gap-5">
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium ">
                Product Categories
              </label>
              <div className="w-full">
                <select
                  {...register("productCategories")}
                  defaultValue=""
                  className="w-full h-9 px-3 border border-gray-300 bg-foreground-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent flex items-center"
                >
                  <option value="" disabled>
                    Select product categories...
                  </option>
                  <option value="1">Electronics</option>
                  <option value="2">Groceries</option>
                  <option value="3">Shoes</option>
                  <option value="4">Clothing</option>
                </select>
              </div>

              {errors.productCategories && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.productCategories?.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
