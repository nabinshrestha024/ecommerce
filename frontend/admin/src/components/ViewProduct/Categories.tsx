"use client";

import { Link } from "react-router-dom";
const data = [
  {
    CategoryId: 0,
    Name: "All",
    url: "/view-products",
  },
  {
    CategoryId: 1,
    Name: "Groceries",
    url: "/view-products",
  },
  {
    CategoryId: 2,
    Name: "Clothes",
    url: "/view-products",
  },
  {
    CategoryId: 3,
    Name: "Shoes",
    url: "/view-products",
  },
  {
    CategoryId: 4,
    Name: "Electronics",
    url: "/view-products",
  },
];

type CategoryProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export const Category = ({
  selectedCategory,
  onSelectCategory,
}: CategoryProps) => {
  return (
    <div>
      <div className="text-xl font-semibold underline mb-10">Categories</div>
      <div className="flex flex-col gap-3 justify-center py-5 border-b">
        {data.map((val) => {
          const isActive = selectedCategory === val.Name;

          return (
            <Link
              to={val.url}
              key={val.Name}
              className={`font-semibold relative transition-colors duration-300 ${
                isActive ? "text-green-700" : ""
              }`}
              onClick={() => onSelectCategory(val.Name)}
            >
              {val.Name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
