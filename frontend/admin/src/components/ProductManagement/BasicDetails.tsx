"use client";

import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { useFormContext } from "react-hook-form";

export const BasicDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Card className="w-full rounded-lg p-6">
      <h1 className="text-2xl font-bold text-foreground">Basic Details</h1>

      <div className="mt-6 flex flex-col gap-6">
        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Product Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Enter product name"
            className={`${errors.name ? "border-destructive aria-invalid:border-destructive" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="shortDescription"
            className="text-sm font-medium text-foreground"
          >
            Short Description
          </label>
          <textarea
            id="shortDescription"
            placeholder="Enter short description"
            className={`rounded-md border-2 border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.shortDescription
                ? "border-destructive focus:border-destructive"
                : ""
            }`}
            {...register("shortDescription")}
          />
          {errors.shortDescription && (
            <p className="text-xs text-destructive">
              {errors.shortDescription.message as string}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter product description"
            className={`rounded-md border-2 border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.description
                ? "border-destructive focus:border-destructive"
                : ""
            }`}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message as string}
            </p>
          )}
        </div>

        {/* Checkbox - Featured */}
        <div className="flex items-center gap-3 rounded-md bg-secondary/30 p-4">
          <input
            id="highlightFeatured"
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-primary"
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
