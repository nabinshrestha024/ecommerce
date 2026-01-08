"use client";

import { Button } from "@/ui/button";
import { useProduct } from "@/hooks/product/useProduct";
import { ProductCardSkeleton } from "../TrendingProduct/component/ProductCardLoading";
import { ProductCard } from "../Product/ProductCard";
import { useRouter } from "next/navigation";

export const Deal = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useProduct();

  const placeholderCount = 4;
  return (
    <div className="w-full px-6 mx-auto flex items-center justify-center">
      <div className="w-full max-w-[1216px]">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-xl">Limited-Time Deal</h1>
          <Button
            variant={"outline"}
            className="rounded-2xl border border-black text-xs"
            onClick={() => router.push("/product")}
          >
            View All
          </Button>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {isLoading &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}

          {isError &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          {data?.items?.map((val, index) => {
            return index < 4 && <ProductCard product={val} />;
          })}
        </div>
      </div>
    </div>
  );
};
