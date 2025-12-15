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

export const NavCategories = () => {
  const pathname = usePathname();
  return (
    <div className="flex gap-10 justify-center items-center py-5 border-b">
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

            <span
              className={`
            absolute left-1/2 -translate-x-1/2 -bottom-1.5
            h-[3px] w-[75%] rounded-xl bg-green-700
            origin-center
            transition-all duration-300 ease-out
            ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
          `}
            />
          </Link>
        );
      })}
    </div>
  );
};
