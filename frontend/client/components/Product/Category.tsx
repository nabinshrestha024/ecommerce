"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const data = [
  {
    title: "All",
    url: "/product",
  },
  {
    title: "Groceries",
    url: "/product/category/groceries",
  },
  {
    title: "Clothes",
    url: "/product/category/clothes",
  },
  {
    title: "Shoes",
    url: "/product/category/shoes",
  },
  {
    title: "Electronics",
    url: "/product/category/electronics",
  },
];

export const Category = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className="text-xl font-semibold underline mb-5">Categories</div>
      <div className="flex md:flex-col gap-3 justify-center py-5 border-b">
        {data.map((val) => {
          const isActive =
            pathname === val.url || (val.title === "All" && pathname === "/");

          return (
            <Link
              href={val.url}
              key={val.title}
              className={`font-semibold relative transition-colors duration-300 ${
                isActive ? "text-green-700" : ""
              }`}
            >
              {val.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
