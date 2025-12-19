import { Card } from "@/components/Card/Card";
import { Button } from "@/ui/button";
import { ProductDatas } from "./ProductData.import";
import Image from "next/image";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { Star } from "lucide-react";
import { products } from "@/components/Product/Product.import";

export const TrendingProductCard = () => {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {ProductDatas.map((_, index) => {
          const randomNumber = Math.floor(Math.random() * 29);
          return (
            index < 3 && (
              <Card
                className="p-3 w-full max-w-[285px] border-0 shadow-none"
                key={products[randomNumber].id}
                rootClassName="py-0 border shadow-xl"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-full h-[185px] relative">
                    <Image
                      src={products[randomNumber].image}
                      alt="image"
                      fill
                      className="w-full h-full object-cover rounded-[12px]"
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-white w-6 h-6 shadow-sm flex justify-center items-center">
                      <IoIosHeartEmpty />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="text-[20px] font-medium line-clamp-1">
                      {products[randomNumber].name}
                    </div>
                    <div className="text-[16px] font-normal leading-[22px] text-[#00000099]/60 line-clamp-2">
                      {products[randomNumber].description}
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < products[randomNumber].rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <div>
                      <span className="text-[14px] text-[#4EA674] font-bold">
                        $ {products[randomNumber].price}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span className="line-through text-[12px] text-[red] font-medium">
                        $ {products[randomNumber].originalPrice}
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

                  <Button className="px-5 py-4 text-[14px] font-bold leading-3 bg-white border border-[#4EA674] text-[#4EA674]  rounded-[200px] hover:bg-[#fffcfc]">
                    Add to cart
                  </Button>
                </div>
              </Card>
            )
          );
        })}
      </div>
    </div>
  );
};
