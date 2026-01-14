"use client";

import { Card } from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { useFormContext } from "react-hook-form";

export const BasicDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Card className="w-full rounded-lg p-6">
      <h1 className="text-2xl font-bold text-foreground">Basic Details</h1>

      <div className=" flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Product Name <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter product name"
            className={`rounded-md border-2 border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.name ? "border-red-500 " : ""
            }`}
            {...register("name")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="shortDescription"
            className="text-sm font-medium text-foreground"
          >
            Short Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="shortDescription"
            placeholder="Enter short description"
            className={`rounded-md border-2 border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.shortDescription ? "border-red-500 " : ""
            }`}
            {...register("shortDescription")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            placeholder="Enter product description"
            className={`rounded-md border-2 border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.description ? "border-red-500 " : ""
            }`}
            {...register("description")}
          />
        </div>

        <div className="flex items-center gap-3 rounded-md bg-secondary/30 ">
          <Checkbox
            id="highlightFeatured"
            className="border-[#4EA764] data-[state=checked]:bg-[#4EA764] data-[state=checked]:border-[#4EA764] data-[state=checked]:text-white"
            {...register("highlightFeatured")}
          />
          <label
            htmlFor="highlightFeatured"
            className="text-sm font-medium cursor-pointer text-foreground"
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
