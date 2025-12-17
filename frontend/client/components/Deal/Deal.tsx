import { Button } from "@/ui/button";
import { deals } from "./deals.import";
import { Card } from "../card/Card";
import Image from "next/image";
import Link from "next/link";
import { IoIosHeartEmpty } from "react-icons/io";
import { Star } from "lucide-react";

export const Deal = () => {
  return (
    <div className="w-full px-6 mx-auto flex items-center justify-center">
      <div className="w-full max-w-[1216px]">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-xl">Limited-Time Deal</h1>
          <Button
            variant={"outline"}
            className="rounded-2xl border border-black text-xs"
          >
            View All
          </Button>
        </div>
        <div className="w-full grid grid-cols-4 gap-5 mt-8">
          {deals.map((productData) => (
            <Card
              className="p-3 w-full max-w-[285px] border-0 shadow-none"
              key={productData.id}
              rootClassName="py-0 border shadow-xl"
            >
              <div className="flex flex-col gap-2">
                <div className="w-full h-[185px] relative">
                  <Image
                    src={productData.image}
                    alt="image"
                    fill
                    className="w-full h-full object-cover rounded-[12px]"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-white w-6 h-6 shadow-sm flex justify-center items-center">
                    <IoIosHeartEmpty />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[20px] font-medium ">
                    {productData.title}
                  </div>
                  <div className="text-[16px] font-normal leading-[22px] text-[#00000099]/60 line-clamp-2">
                    {productData.desc}
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < productData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <div>
                    <span className="text-[14px] text-[#4EA674] font-bold">
                      Rs. {productData.dealPrice}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="line-through text-[12px] text-[red] font-medium">
                      Rs. {productData.actualPrice}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Link href="/productDetails">
                  <div className="text-[14px] text-[#6467F2] font-normal">
                    View Details
                  </div>
                </Link>

                <Button className="px-5 py-4 text-[14px] font-bold leading-3 bg-[#4EA674] text-white  rounded-[200px] hover:bg-[#4EA674]">
                  Add to cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
