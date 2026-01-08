"use client";

import Image from "next/image";
import { Card } from "../Card/Card";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import { Star, Trash2 } from "lucide-react";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";
import { Button } from "@/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { toast } from "sonner";
import { Dialog } from "../Dialog/Dialog";
import { useState } from "react";
import { DialogClose, DialogTitle } from "@/ui/dialog";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";
import { WishlistProductCard } from "./WishlistProductCard";

interface WishlistItem {
  wishlistId: number;
  productId: number;
  slug: string;
  productImageUrl: string;
  productName: string;
  description: string;
  price: number;
}

export const Wishlist = () => {
  const { data } = useFetchWishlist();

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-6">
        {data?.items?.map((product: WishlistItem) => (
          <WishlistProductCard
            wishlistId={product.wishlistId}
            productId={product.productId}
          />
        ))}
      </div>
    </div>
  );
};
