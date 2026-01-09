"use client";

import Image from "next/image";
import { Card } from "@/components/Card/Card";
import { useProduct } from "@/hooks/product/useProduct";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import Link from "next/link";
export const SecondCard = () => {
  const { data, isLoading, isError } = useProduct();

  return (
    <Card
      rootClassName="p-0 shadow-none border-none"
      className="p-4 pb-6 h-full border shadow-lg w-full lg:w-auto rounded-2xl bg-white"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Gaming accessories
        </h2>
        <div className="grid grid-cols-2 gap-4 px-2">
          {isLoading || isError
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden flex items-center justify-center rounded-lg shadow-md transition-shadow duration-300"
                >
                  <Skeleton className="w-[200px] h-[90px]" />
                </div>
              ))
            : data?.items
                ?.filter((item) => item.categoryName === "Electronics")
                .map(
                  (item, index) =>
                    index < 4 && (
                      <Link
                        href={`/product/id/${item.slug}`}
                        key={item.productId}
                        className="overflow-hidden flex items-center justify-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        onClick={() => console.log("accessories", item.name)}
                      >
                        <div className="relative h-25 w-[81px]">
                          <Image
                            src={item.primaryImageUrl}
                            alt={item.name}
                            fill
                            className="max-w-full object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      </Link>
                    ),
                )}
        </div>
      </div>
    </Card>
  );
};
