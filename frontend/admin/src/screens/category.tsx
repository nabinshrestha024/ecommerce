import { CategoryHeader } from "../components/Category/CategoryHeader";
import { CategoryCard } from "../components/Category/CategoryCard";

export const Category = () => {
  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <CategoryHeader />
      <CategoryCard />
    </div>
  );
};
