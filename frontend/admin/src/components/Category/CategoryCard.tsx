import { Card } from "../Card/Card";
import { Categories } from "./CategoryData.import";

export const CategoryCard = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-5">
      {Categories.map((category) => (
        <Card
          key={category.categoryId}
          className="w-full p-0 rounded-md "
          cardClassName="p-3 border border-[#E5E7EB] shadow-sm"
        >
          <div className="w-ull flex gap-3 items-center ">
            <div className="w-16 h-16 border border-[#E5E7EB] rounded-md overflow-hidden">
              <img
                src={category.image}
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>{category.categoryName}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};
