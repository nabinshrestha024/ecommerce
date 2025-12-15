import { CategoryHeader } from "../components/Category/CategoryHeader";
import { CategoryCard } from "../components/Category/CategoryCard";
import { CategoryTable } from "../components/Category/CategoryTable";

export const Category = () => {
  return (
    <div className="w-full pt-6 pr-11 pb-24 pl-5">
      <CategoryHeader />
      <CategoryCard />
      <CategoryTable />
    </div>
  );
};
