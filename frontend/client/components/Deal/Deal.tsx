"use client";

import { Button } from "@/ui/button";
import { useProduct } from "@/hooks/product/useProduct";
import { ProductCardSkeleton } from "../TrendingProduct/component/ProductCardLoading";
import { ProductCard } from "../Product/ProductCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Deal = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 100,
  });
  const { data, isLoading, isError } = useProduct(
    pagination.pageIndex + 1,
    pagination.pageSize,
  );

  const placeholderCount = 4;
  return (
    <div className="w-full px-6 mx-auto flex items-center justify-center">
      <div className="w-full max-w-[1216px]">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-xl text-emerald-600">
            Limited Time Deal
          </div>
          <div
            className="text-[14px] underline underline-offset-2 text-[#6467F2] font-bold cursor-pointer"
            onClick={() => router.push("/product")}
          >
            View All
          </div>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {isLoading &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}

          {isError &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          {data?.items
            ?.filter((qty) => qty.stockQuantity > 0)
            ?.filter((item) =>
              item.tags?.some((tag) => tag.name === "Best Seller"),
            )
            .slice(0, 4)
            .map((val) => (
              <ProductCard key={val.productId} product={val} />
            ))}
        </div>
      </div>
    </div>
  );
};
