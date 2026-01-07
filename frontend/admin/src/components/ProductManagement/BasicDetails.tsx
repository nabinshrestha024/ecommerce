import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { useFormContext } from "react-hook-form";
export const BasicDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Card
      className="flex flex-col shadow-[0px_1px_3px_0px_#00000033] w-full py-4 sm:py-6 px-4 sm:px-6 rounded-xl"
      cardClassName="p-0 border-none shadow-none w-full"
    >
      <div className="flex justify-start font-bold text-[22px] leading-[26px] tracking-[0%]">
        Basic Details
      </div>
      <div className="flex flex-col mt-6 gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col ">
            <label className="block text-sm font-medium ">Product Name</label>
            <Input
              type="text"
              placeholder="Enter product name...."
              className="w-full h-9 px-3 border mt-2 border-gray-300 bg-foreground-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              {...register("name")}
            />
            {errors.name && (
              <div className="text-sm text-red-500">
                {errors.name?.message as string}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium ">
              Short Description
            </label>
            <Input
              type="textarea"
              placeholder="Enter short description...."
              className="w-full border mt-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              {...register("shortDescription")}
            />
            {errors.shortDescription && (
              <div className="text-sm text-red-500">
                {errors.shortDescription?.message as string}
              </div>
            )}
          </div>
          <div className="flex flex-col ">
            <label className="block text-sm font-medium ">Description</label>
            <Input
              type="textarea"
              placeholder="Enter product description...."
              className="w-full border mt-2 border-gray-300 bg-foreground-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              {...register("description")}
            />
            {errors.description && (
              <div className="text-sm text-red-500">
                {errors.description?.message as string}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("highlightFeatured")}
                className="h-4 w-4"
              />
              <label className="text-sm font-medium ">
                Highlight this product in featured section
              </label>
            </div>
            {errors.highlightFeatured && (
              <p className="text-sm text-red-500">
                {errors.highlightFeatured?.message as string}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
