"use client";

import { useFetchCategory } from "@/hooks/category/useFetchCategory";

type CategoryProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export const Category = ({
  selectedCategory,
  onSelectCategory,
}: CategoryProps) => {
  const categories = useFetchCategory();
  const categoriesList = categories.data;
  return (
    <div>
      <div className="text-xl font-semibold underline mb-10">Categories</div>
      <div className="flex flex-col gap-3 justify-center py-5 border-b">
        <div
          className="font-semibold relative transition-colors duration-300 cursor-pointer"
          onClick={() => onSelectCategory("All")}
        >
          All
        </div>
        {categoriesList?.map((val) => {
          const isActive = selectedCategory === val.name;
          return (
            <div
              key={val.name}
              className={`font-semibold relative transition-colors duration-300 cursor-pointer${
                isActive ? "text-green-700" : ""
              }`}
              onClick={() => onSelectCategory(val.name)}
            >
              {val.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
