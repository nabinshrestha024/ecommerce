"use client";

import { Button } from "@/ui/button";
import Image from "next/image";
import { bestSelling } from "./bestSelling.import";
import { useRouter } from "next/navigation";

export const BestSelling = () => {
  const router = useRouter();
  return (
    <div className="w-full px-6 mx-auto flex items-center justify-center">
      <div className="w-full max-w-[1216px]">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-xl text-emerald-600">
            Best Selling Product
          </div>
          <div
            className="text-[14px] underline underline-offset-2 text-[#6467F2] font-bold cursor-pointer"
            onClick={() => router.push("/product")}
          >
            View All
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-5 w-full mt-8 h-[400px]">
          {bestSelling.map((card) => (
            <div
              key={card.id}
              className="relative w-full h-full rounded-xl shadow overflow-hidden hover:shadow-lg"
              style={{
                gridColumn: `${card.colStart} / span ${card.colSpan}`,
                gridRow: `${card.rowStart} / span ${card.rowSpan}`,
              }}
            >
              <a href={card.href}>
                <Image
                  src={card.image}
                  alt="Image"
                  fill
                  className="object-cover"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
