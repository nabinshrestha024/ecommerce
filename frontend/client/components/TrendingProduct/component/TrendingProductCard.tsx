"use client";

import { Card } from "@/components/Card/Card";
import { Button } from "@/ui/button";
import Image from "next/image";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { Star } from "lucide-react";
import { useProduct } from "@/hooks/product/useProduct";

export const TrendingProductCard = () => {
  const prods = useProduct();

  if (prods.isLoading) return <p>Loading products...</p>;
  if (prods.isError) return <p>Failed to load products</p>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {prods.data?.items.map(
        (product, index) =>
          index < 3 && (
            <Card
              key={product.productId}
              className="p-3 w-full max-w-[285px] border-0 shadow-none"
              rootClassName="py-0 border shadow-xl"
            >
              <div className="flex flex-col gap-2">
                <div className="w-full h-[185px] relative">
                  <Image
                    src={product.primaryImageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded-[12px]"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-white w-6 h-6 shadow-sm flex justify-center items-center">
                    <IoIosHeartEmpty />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[20px] font-medium line-clamp-1">
                    {product.name}
                  </div>

                  <div className="text-[16px] text-[#00000099]/60 line-clamp-2">
                    {product.shortDescription}
                  </div>

                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-gray-300" />
                    ))}
                  </div>

                  <div className="text-[14px] text-[#4EA674] font-bold">
                    Rs {product.price}
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                <Link href={`/product/id/${product.slug}`}>
                  <span className="text-[14px] text-[#6467F2]">
                    View Details
                  </span>
                </Link>

                <Button className="px-5 py-4 text-[14px] font-bold bg-white border border-[#4EA674] text-[#4EA674] rounded-[200px]">
                  Add to cart
                </Button>
              </div>
            </Card>
          ),
      )}
    </div>
  );
};
