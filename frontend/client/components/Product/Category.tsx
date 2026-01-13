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
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex flex-row items-center justify-baseline">
        <div className="w-full flex flex-row flex-nowrap px-2   md:flex-col gap-3 overflow-x-scroll no-scrollbar md:overflow-hidden justify-start md:justify-center md:py-5 border-b">
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
                className={`font-semibold relative transition-colors duration-300 whitespace-nowrap ${
                  isActive ? "text-green-700" : ""
                }`}
              >
                {val.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
