"use client";

import { Button } from "@/ui/button";
import { Card } from "../card/Card";
import Image from "next/image";
import { useCategory } from "@/hooks/category/useCategory";
import Link from "next/link";
import { CategoryCardSkeleton } from "./components/CategoryLoadingCard";
import { useRouter } from "next/navigation";

export const Explore = () => {
  const router = useRouter();
  const { data, isError, isLoading } = useCategory();
  const placeholderCount = 4;
  return (
    <div className="w-full px-6 mx-auto flex items-center justify-center">
      <div className="w-full max-w-[1216px]">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-xl">Start exploring now</h1>
          <Button
            variant={"outline"}
            className="rounded-2xl border border-black text-xs"
            onClick={() => router.push("/product")}
          >
            View All
          </Button>
        </div>

        <div className="flex gap-5 justify-center md:justify-start text-center mt-8 flex-wrap">
          {isLoading &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}

          {isError &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          {data?.items?.map((val) => {
            const href = `/product/?categoryId=${val.categoryId}`;

            return (
              <Link key={val.categoryId} href={href} className="block">
                <Card className="shadow-none p-2 min-w-[220px] flex flex-col gap-2 cursor-pointer hover:shadow-lg hover:rounded-2xl">
                  <div className="w-full h-[150px] relative">
                    <Image
                      src={val.categoryImageURL}
                      alt={val.name ?? "Image"}
                      fill
                      className="object-cover rounded-[12px]"
                      unoptimized
                    />
                  </div>
                  <p className="font-medium">{val.name}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
