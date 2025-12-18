import { Button } from "@/ui/button";
import { TrendingProductCard } from "../component/TrendingProductCard";
import { Trennd } from "../component/Trennd";
export const ProductCard = () => {
  return (
    <div>
      <div className="w-full flex flex-col  gap-4 lg:gap-8 mx-auto max-w-[1216px]">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">Trending Product</div>
          <Button
            variant={"outline"}
            className="rounded-2xl border border-black text-xs"
          >
            View All
          </Button>
        </div>
        <div className="flex gap-5 flex-col lg:flex-row lg:gap-[30px]">
          <TrendingProductCard />
          <Trennd />
        </div>
      </div>
    </div>
  );
};
