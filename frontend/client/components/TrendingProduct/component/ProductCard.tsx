import { Button } from "@/ui/button";
import { TrendingProductCard } from "../component/TrendingProductCard";
import { Trennd } from "../component/Trennd";
export const ProductCard = () => {
  return (
    <div>
      <div className="w-full flex flex-col  gap-4 lg:gap-8 mx-auto max-w-[1216px]">
        <div className="flex justify-between">
          <div className="text-[32px] font-bold text-[#000000]">
            Trending Product
          </div>
          <Button className="border border-black px-6 py-3 rounded-[200px] bg-white hover:bg-white text-black">
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
