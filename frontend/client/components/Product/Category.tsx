"use client";

import { useCategory } from "@/hooks/category/useCategory";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const Category = () => {
  const categoryItems = useCategory();
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get("categoryId");

  const buildCategoryUrl = (categoryId: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId) {
      params.set("categoryId", categoryId.toString());
    } else {
      params.delete("categoryId");
    }

    return `/product?${params.toString()}`;
  };

  return (
    <div>
      <div className="text-xl font-semibold underline mb-5">Categories</div>
      <div className="flex md:flex-col gap-3 justify-center py-5 border-b">
        <Link
          href={buildCategoryUrl(null)}
          className={`font-semibold transition-colors ${
            !activeCategoryId ? "text-green-700" : ""
          }`}
        >
          All
        </Link>

        {(categoryItems.data?.items || []).map((val) => {
          const isActive =
            val.categoryId === null
              ? !activeCategoryId
              : activeCategoryId === String(val.categoryId);

          return (
            <Link
              href={buildCategoryUrl(val.categoryId)}
              key={val.name}
              className={`font-semibold relative transition-colors duration-300 ${
                isActive ? "text-green-700" : ""
              }`}
            >
              {val.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
