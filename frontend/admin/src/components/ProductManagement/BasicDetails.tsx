import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { useFormContext } from "react-hook-form";
export const BasicDetails = () => {
  const { register } = useFormContext();
  return (
    <Card
      className="flex flex-col shadow-[0px_1px_3px_0px_#00000033] w-full py-6 px-6"
      cardClassName="p-0"
    >
      <div className="font-bold text-[22px] leading-[26px] tracking-[0%]">
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
        </div>
        <div className="flex flex-col gap-3">
          <label className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <Input
            type="textarea"
            placeholder="Enter product description...."
            className="w-full bg-[#F9FAFB] h-full p-3"
            {...register("productDescription")}
          />
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
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Expiration
              </label>
              <div className="grid grid-cols-2 w-full gap-5">
                <div className="flex flex-col gap-3 w-full">
                  <Input
                    type="date"
                    placeholder="Start"
                    className="w-full"
                    {...register("expirationStart")}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <Input
                    type="date"
                    placeholder="End"
                    className="w-full"
                    {...register("expirationEnd")}
                  />
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
                Stock Quantity
              </label>
              <Input
                type="number"
                placeholder="Stock quantity..."
                {...register("stockQuantity")}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Stock Status
              </label>
              <select
                {...register("stockStatus")}
                className="w-full bg-[#F9FAFB] h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center"
              >
                <option value="" disabled selected>
                  Select stock status...
                </option>
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("highlightFeatured")}
            className="h-4 w-4"
          />
          <label className="text-sm font-medium text-gray-700">
            Highlight this product in featured section
          </label>
        </div>
      </div>
    </Card>
  );
};
