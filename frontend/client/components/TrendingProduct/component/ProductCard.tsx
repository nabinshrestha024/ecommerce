"use client";

import { Button } from "@/ui/button";
import { TrendingProductCard } from "../component/TrendingProductCard";
import { Trennd } from "../component/Trennd";
import { useRouter } from "next/navigation";
export const ProductCard = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-full flex flex-col  gap-4 lg:gap-8 mx-auto max-w-[1216px]">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-emerald-600">
            Trending Product
          </div>
          <div
            className="text-[14px] underline underline-offset-2 text-[#6467F2] font-bold cursor-pointer"
            onClick={() => router.push("/product")}
          >
            View All
          </div>
        </div>
        <div className="flex gap-5 flex-col lg:flex-row lg:gap-[30px]">
          <TrendingProductCard />
          <Trennd />
        </div>
      </div>
    </div>
  );
};
