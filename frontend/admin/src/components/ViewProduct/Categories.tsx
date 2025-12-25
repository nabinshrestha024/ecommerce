"use client";
export const STATIC_CATEGORIES = [
  {
    CategoryId: 0,
    Name: "All",
  },
  {
    CategoryId: 1,
    Name: "Grocery",
  },
  {
    CategoryId: 2,
    Name: "Clothes",
  },
  {
    CategoryId: 3,
    Name: "Shoes",
  },
  {
    CategoryId: 4,
    Name: "Electronics",
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
        {STATIC_CATEGORIES.map((val) => {
          const isActive = selectedCategory === val.Name;

          return (
            <div
              key={val.Name}
              className={`font-semibold relative transition-colors duration-300 cursor-pointer${
                isActive ? "text-green-700" : ""
              }`}
              onClick={() => onSelectCategory(val.Name)}
            >
              {val.Name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
