import { useFetchCategory } from "@/hooks/category/useFetchCategory";
import { Card } from "../Card/Card";

export const CategoryCard = () => {
  const categories = useFetchCategory();
  console.log(categories);
  return (
    <div className="w-full grid grid-cols-4 gap-5 mb-[42px]">
      {categories.data?.map((category) => (
        <Card
          key={category.categoryId}
          className="w-full p-0 rounded-md "
          cardClassName="p-3 border border-[#E5E7EB] shadow-sm"
        >
          <div className="w-ull flex gap-3 items-center ">
            <div className="w-16 h-16 border border-[#E5E7EB] rounded-md overflow-hidden">
              <img
                src={category.categoryImageUrl || "/placeholder-image.png"}
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>{category.name}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};
