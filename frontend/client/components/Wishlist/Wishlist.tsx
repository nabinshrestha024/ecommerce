"use client";

import Image from "next/image";
import { Card } from "../Card/Card";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import { Star, Trash2 } from "lucide-react";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";
import { wishlistData } from "../TrendingProduct/component/TrendingProductCard";
import { Button } from "@/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { toast } from "sonner";
import { Dialog } from "../Dialog/Dialog";
import { useState } from "react";
import { DialogClose, DialogTitle } from "@/ui/dialog";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface WishlistItem {
  wishlistId: number;
  productId: number;
  slug: string;
  productImageUrl: string;
  productName: string;
  description: string;
  price: number;
}

const sizes = [
  {
    id: 0,
    value: "s",
    isActive: true,
  },
  {
    id: 1,
    value: "m",
    isActive: false,
  },
  {
    id: 2,
    value: "xl",
    isActive: false,
  },
];

export const Wishlist = () => {
  const stockValue = 20;
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<
    Record<number, number | null>
  >({});
  const { data } = useFetchWishlist();
  const { mutate } = useDeleteWishlist();
  const addToCart = useAddToCart();
  const { token } = useAuth();

  const handleDeleteWishlist = (productId: wishlistData) => {
    console.log(productId);
    mutate(productId);
  };

  const handleIncrease = () => {
    if (quantity < stockValue) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      return 1;
    }
    setQuantity(quantity - 1);
  };

  const handleAddToCart = (
    productId: number,
    quantity: number,
    sizeValue?: string,
  ) => {
    if (token) {
      // addToCart.mutate({
      //   productId: productId,
      //   quantity: 1,
      // });
      console.log("Product: ", productId);
      console.log("Quantity: ", quantity);
      console.log("Size: ", sizeValue);
    } else {
      toast.message("Login to add to cart");
    }
  };

  const handleSelectSize = (productId: number, sizeId: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeId }));
  };

  return (
    <div className="w-full">
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
                  src={wishlist.productImageUrl}
                  alt={wishlist.productName}
                  fill
                  className="object-cover rounded-[12px]"
                  unoptimized
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
                <Dialog
                  open={open}
                  onOpenChange={setOpen}
                  triggerText={
                    <Button
                      className="w-full px-5 py-4 text-[14px] font-bold bg-white border border-[#4EA674] text-[#4EA674] rounded-[200px] hover:bg-[#fffcfc]"
                      onPointerDownCapture={() => setQuantity(1)}
                    >
                      Add to cart
                    </Button>
                  }
                >
                  <div className="flex flex-col gap-4">
                    <DialogTitle className="text-[18px] font-bold">
                      Cart Information
                    </DialogTitle>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-5 w-full">
                        <div className="w-[100px] h-[100px] relative">
                          <Image
                            src={wishlist.productImageUrl}
                            alt={wishlist.productName}
                            fill
                            className="object-cover rounded-[12px]"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="text-[25px] font-bold">
                            {wishlist.productName}
                          </div>
                          <div className="text-[16px] line-clamp-2">
                            {wishlist.description}
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex justify-between">
                        <div className="flex gap-2.5 items-center">
                          <button
                            className="p-1 rounded border disabled:opacity-50"
                            onClick={() => handleDecrease()}
                          >
                            <MdKeyboardArrowDown />
                          </button>
                          <div className="px-3 py-1 border rounded">
                            {quantity}
                          </div>
                          <button
                            className="p-1 rounded border"
                            onClick={() => handleIncrease()}
                          >
                            <MdKeyboardArrowUp />
                          </button>
                        </div>
                        <div className="text-sm italic">
                          Stock: {stockValue}{" "}
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="font-semibold ">Sizes: </div>
                        <div className="flex gap-2">
                          {(() => {
                            const defaultSizeId =
                              sizes.find((s) => s.isActive)?.id ?? 0;
                            const selectedSizeId =
                              selectedSizes[wishlist.productId] ??
                              defaultSizeId;
                            return sizes.map((size) => {
                              const isSelected = selectedSizeId === size.id;
                              return (
                                <div
                                  key={size.id}
                                  onClick={() =>
                                    handleSelectSize(
                                      wishlist.productId,
                                      size.id,
                                    )
                                  }
                                  className={`w-8 h-8 flex items-center justify-center border rounded text-md bg-white cursor-pointer transition-colors ${
                                    isSelected
                                      ? "border-[#4EA674] text-[#4EA674]"
                                      : "border-gray-200 text-gray-600"
                                  }`}
                                >
                                  {size.value}
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    </div>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          const defaultSizeId =
                            sizes.find((s) => s.isActive)?.id ?? 0;
                          const selectedSizeId =
                            selectedSizes[wishlist.productId] ?? defaultSizeId;
                          const selectedSizeValue = sizes.find(
                            (s) => s.id === selectedSizeId,
                          )?.value;
                          handleAddToCart(
                            wishlist.productId,
                            quantity,
                            selectedSizeValue,
                          );
                        }}
                        className="px-4 py-2 bg-[#4EA674] text-white"
                      >
                        Confirm
                      </Button>
                    </DialogClose>
                  </div>
                </Dialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
