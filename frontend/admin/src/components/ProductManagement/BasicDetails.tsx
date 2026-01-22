"use client";

import { Card } from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input/Input";

export const BasicDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Card className="w-full rounded-lg p-0 border-0 shadow-none">
      {/* <h1 className="text-2xl font-bold text-foreground">Basic Details</h1> */}

      <div className=" flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label htmlFor="name" className="font-medium text-gray-700 ">
            Name
          </label>
          <div className="col-span-3">
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              className={` w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${
                errors.name ? "border-red-500 " : ""
              }`}
              {...register("name")}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4 mt-5">
          <label className="font-medium text-gray-700 ">Description</label>
          <div className="col-span-3">
            <Input
              type="textarea"
              placeholder="Enter description"
              rows={4}
              {...register("description")}
              className={`w-full  px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.description ? "border-red-500" : ""}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4 mt-5">
          <label className="font-medium text-gray-700 ">Short Desc</label>
          <div className="col-span-3">
            <Input
              type="textarea"
              placeholder="Enter short description"
              {...register("shortDescription")}
              className={`w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0 ${errors.shortDescription ? "border-red-500" : ""}`}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md bg-secondary/30 ">
          <Checkbox
            id="highlightFeatured"
            className="border-[#4EA764] data-[state=checked]:bg-[#4EA764] data-[state=checked]:border-[#4EA764] data-[state=checked]:text-white"
            {...register("highlightFeatured")}
          />
          <label
            htmlFor="highlightFeatured"
            className="font-medium text-gray-700"
          >
            Highlight this product in featured section
          </label>
        </div>
        {errors.highlightFeatured && (
          <p className="text-xs text-destructive">
            {errors.highlightFeatured.message as string}
          </p>
        )}
      </div>
    </Card>
  );
};
