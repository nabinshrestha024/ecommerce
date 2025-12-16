import { Card } from "@/components/card/Card";
import { Button } from "@/ui/button";
import { ProductDatas } from "./ProductData.import";
import Image from "next/image";

export const TrendingProductCard = () => {
  return (
    <div className="flex flex-col gap-8 pt-20 pr-9 pb-[100px] pl-[100px]">
      <div className="flex justify-between">
        <div className="text-[32px] font-bold text-[#000000]">
          Trending Product
        </div>
        <Button className="border border-black px-6 py-3 rounded-[200px] bg-white hover:bg-white text-black">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {ProductDatas.map((productData) => (
          <Card
            className="p-3 w-full"
            key={productData.id}
            rootClassName="py-0"
          >
            <div className="flex flex-col gap-2">
              <Image
                src={productData.image}
                alt="image"
                width={248}
                height={180}
                className="w-full rounded-[12px]"
              />
              <div className="">
                <div>{productData.name}</div>
                <div>{productData.shortDescription}</div>
                <div>{productData.rating}</div>
                <div>
                  <span className="text-[22px] text-[#4EA674] font-bold">
                    Rs. {productData.price.newPrice}
                  </span>
                  <span className="line-through text-[22px] text-[#00000099]/60 font-bold">
                    Rs. {productData.price.oldPrice}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
