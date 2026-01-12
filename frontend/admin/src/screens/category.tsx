import { CategoryHeader } from "../components/Category/CategoryHeader";
import { CategoryCard } from "../components/Category/CategoryCard";

export const Category = () => {
  return (
    <div className="w-full pt-6 pr-11 pb-24 pl-5 space-y-5">
      <CategoryHeader />
      <CategoryCard />
    </div>
  );
};
