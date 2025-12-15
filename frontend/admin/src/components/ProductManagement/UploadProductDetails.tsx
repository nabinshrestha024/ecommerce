import React, { useState } from "react";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { useFormContext } from "react-hook-form";
export const UploadProductDetails = () => {
  const [preview, setPreview] = useState<string>("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    setPreview(imgUrl);
  };
  const { register } = useFormContext();
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
                {preview ? (
                  <img
                    src={preview}
                    alt="Product preview"
                    className="max-h-40 object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm text-left">
                    Upload Image
                  </span>
                )}
              </div>
            </label>

            <input
              id="productImage"
              type="file"
              accept="image/*"
              {...register("productImage")}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="font-bold text-[22px] leading-[26px] tracking-[0%]">
            Categories
          </div>
          <div className="flex flex-col mt-6 gap-5">
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Categories
              </label>
              <div className="w-full">
                <select
                  {...register("productCategories")}
                  defaultValue=""
                  className="w-full bg-[#F9FAFB] h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center"
                >
                  <option value="" disabled>
                    Select product categories...
                  </option>
                  <option value="electronics">Electronics</option>
                  <option value="groceries">Groceries</option>
                  <option value="shoes">Shoes</option>
                  <option value="clothes">Clothing</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Tags
              </label>
              <Input
                type="text"
                placeholder="Enter product tags..."
                className="w-full bg-[#F9FAFB] h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("productTags")}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
