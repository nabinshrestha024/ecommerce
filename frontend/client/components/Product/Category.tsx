"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const data = [
  {
    title: "Groceries",
    url: "/product/groceries",
  },
  {
    title: "Clothes",
    url: "/product/clothes",
  },
  {
    title: "Shoes",
    url: "/product/shoes",
  },
  {
    title: "Electronics",
    url: "/product/electronics",
  },
];

export const Category = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className="text-xl font-semibold underline mb-10">Categories</div>
      <div className="flex flex-col gap-3 justify-center py-5 border-b">
        {data.map((val) => {
          const isActive = pathname === val.url;

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
