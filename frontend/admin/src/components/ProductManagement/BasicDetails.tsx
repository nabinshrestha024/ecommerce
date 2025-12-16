import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { useFormContext } from "react-hook-form";
export const BasicDetails = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedCategory = watch("stockStatus");
  return (
    <Card
      className="flex flex-col shadow-[0px_1px_3px_0px_#00000033] w-full py-4 sm:py-6 px-4 sm:px-6 rounded-xl"
      cardClassName="p-0 border-none shadow-none w-full"
    >
      <div className="flex justify-center font-bold text-[22px] leading-[26px] tracking-[0%]">
        Basic Details
      </div>
      <div className="flex flex-col mt-6 gap-8">
        <div className="flex flex-col gap-3">
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <Input
            type="text"
            placeholder="Enter product name...."
            className="w-full bg-[#F9FAFB] h-12"
            {...register("productName")}
          />
          {errors.productName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.productName?.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            placeholder="Enter product description...."
            className="w-full bg-[#F9FAFB] h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("productDescription")}
          />
          {errors.productDescription && (
            <p className="text-sm text-red-500 mt-1">
              {errors.productDescription?.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="font-bold text-[22px] leading-[26px] tracking-[0%]">
            Pricing
          </div>
          <div className="flex flex-col mt-6 gap-5">
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Price
              </label>
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 font-bold">
                  Rs
                </div>
                <Input
                  type="number"
                  placeholder="Enter product price...."
                  className="w-full bg-[#F9FAFB] h-full p-3 pl-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  {...register("productPrice")}
                />
              </div>
              {errors.productPrice && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.productPrice?.message as string}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-3 ">
                <label className="block text-sm font-medium text-gray-700">
                  Discounted Price{" "}
                  <span className="font-normal">(Optional)</span>
                </label>
                <div className="relative w-full">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 font-bold">
                    Rs
                  </div>
                  <Input
                    type="number"
                    placeholder="Discounted price...."
                    className="w-full bg-[#F9FAFB] h-full p-3 pl-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    {...register("discountedPrice")}
                  />
                </div>
                {errors.discountedPrice && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.discountedPrice?.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3 ">
                <label className="block text-sm font-medium text-gray-700">
                  Tax Included
                </label>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("taxIncluded")}
                      className="h-4 w-4"
                      value="yes"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("taxIncluded")}
                      className="h-4 w-4"
                      value="no"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-[22px] leading-[26px] tracking-[0%]">
            Inventory
          </div>
          <div className="grid grid-cols-2 mt-6 gap-5">
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Stock Status
              </label>
              <select
                {...register("stockStatus")}
                defaultValue=""
                className="w-full bg-[#F9FAFB] h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center"
              >
                <option value="" disabled>
                  Select stock status...
                </option>
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              {errors.stockStatus && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.stockStatus?.message as string}
                </p>
              )}
            </div>
            {selectedCategory === "in-stock" && (
              <div className="flex flex-col gap-3">
                <label className="block text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <Input
                  type="number"
                  placeholder="Stock quantity..."
                  {...register("stockQuantity")}
                  className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                {errors.stockQuantity && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.stockQuantity?.message as string}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("highlightFeatured")}
            className="h-4 w-4"
            required
          />
          {errors.highlightFeatured && (
            <p className="text-sm text-red-500 mt-1">
              {errors.highlightFeatured?.message as string}
            </p>
          )}

          <label className="text-sm font-medium text-gray-700">
            Highlight this product in featured section
          </label>
        </div>
      </div>
    </Card>
  );
};
