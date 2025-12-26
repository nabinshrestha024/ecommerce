"use client";

import Image from "next/image";
import { Card } from "../Card/Card";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/ui/button";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";
import { wishlistData } from "../TrendingProduct/component/TrendingProductCard";

interface WishlistItem {
  wishlistId: number;
  productId: number;
  slug: string;
  primaryImageUrl: string;
  productName: string;
  description: string;
  price: number;
}

export const Wishlist = () => {
  const { data } = useFetchWishlist();
  const { mutate } = useDeleteWishlist();
  console.log("Wishlist", data);

  const handleDeleteWishlist = (productId: wishlistData) => {
    console.log(productId);
    mutate(productId);
  };

  return (
    <div className="w-screen">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {data?.items?.map((wishlist: WishlistItem) => (
          <Card
            key={wishlist.productId}
            className="p-3 w-full border-0 shadow-none"
            rootClassName="py-0 border shadow-xl"
          >
            <div className="flex flex-col gap-2">
              <div className="w-full h-[185px] relative">
                <Image
                  src={wishlist.primaryImageUrl}
                  alt={wishlist.productName}
                  fill
                  className="object-cover rounded-[12px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[20px] font-medium line-clamp-1">
                  {wishlist.productName}
                </div>
                <div className="text-[16px] text-[#00000099]/60 line-clamp-2">
                  {wishlist.description}
                </div>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-gray-300" />
                  ))}
                </div>

                <div className="w-full flex justify-between">
                  <div className="text-[14px] text-[#4EA674] font-bold">
                    Rs {wishlist.price}
                  </div>
                  <Trash2
                    color="red"
                    onClick={() => handleDeleteWishlist(wishlist.productId)}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
