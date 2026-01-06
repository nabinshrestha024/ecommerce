"use client";

import { Button } from "@/ui/button";
import { Card } from "../Card/Card";
import Image from "next/image";
import Link from "next/link";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useProduct } from "@/hooks/product/useProduct";
import { useAuth } from "@/contexts/AuthContext";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { toast } from "sonner";
import { useAddWishlist } from "@/hooks/wishlist/useAddWishlist";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import {
  wishlistData,
  WishlistItem,
} from "../TrendingProduct/component/TrendingProductCard";
import { useState } from "react";
import { Dialog } from "../Dialog/Dialog";
import { DialogClose, DialogTitle } from "@/ui/dialog";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { ProductCardSkeleton } from "../TrendingProduct/component/ProductCardLoading";

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

export const Deal = () => {
  const stockValue = 20;
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<
    Record<number, number | null>
  >({});
  const { data, isLoading, isError } = useProduct();
  const addMutate = useAddWishlist();
  const deleteMutate = useDeleteWishlist();
  const wishlists = useFetchWishlist();
  const { token } = useAuth();
  const addToCart = useAddToCart();

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
      addToCart.mutate({
        productId: productId,
        quantity: quantity,
      });
    } else {
      toast.message("Login to add to cart");
    }
  };

  const handleSelectSize = (productId: number, sizeId: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeId }));
  };

  const wishlistItems = Array.isArray(wishlists?.data)
    ? wishlists.data
    : (wishlists?.data?.items ?? []);

  const wishedIds = new Set<number>(
    wishlistItems
      .map((wishlist: WishlistItem) => Number(wishlist.productId))
      .filter((id: number) => !Number.isNaN(id)),
  );

  const handleAddWishlist = (productId: wishlistData) => {
    console.log(productId);
    addMutate.mutate(productId);
  };

  const handleDeleteWishlist = (productId: wishlistData) => {
    deleteMutate.mutate(productId);
  };
  const placeholderCount = 4;
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {isLoading &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}

          {isError &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          {data?.items?.map((val, index) => {
            return (
              index < 4 && (
                <Card
                  className="p-3 w-full border-0 shadow-none"
                  key={val.productId}
                  rootClassName="py-0 border shadow-xl"
                >
                  <div className="flex flex-col gap-2 h-[310px] justify-between">
                    <div>
                      <div className="w-full h-[185px] relative">
                        <Image
                          src={val.primaryImageUrl}
                          alt="image"
                          fill
                          className="w-full h-full object-cover rounded-[12px]"
                          unoptimized
                        />
                        <div className="absolute top-3 right-3 rounded-full w-6 h-6 shadow-sm flex justify-center items-center cursor-pointer">
                          {wishedIds.has(val.productId) ? (
                            <IoIosHeart
                              size={16}
                              className="text-red-600"
                              onClick={() =>
                                handleDeleteWishlist(val.productId)
                              }
                            />
                          ) : (
                            <IoIosHeartEmpty
                              size={16}
                              className="text-gray-400"
                              onClick={() => handleAddWishlist(val.productId)}
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="text-[20px] font-medium line-clamp-1">
                          {val.name}
                        </div>
                        <div className="text-[16px] font-normal leading-[22px] text-[#00000099]/60 line-clamp-2">
                          {val.shortDescription}
                        </div>
                        {/* <div className="flex items-center mb-2">
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
                      </div> */}
                        <div>
                          <span className="text-[18px] text-[#4EA674] font-bold">
                            Rs. {val.price}
                          </span>
                          &nbsp;&nbsp;&nbsp;
                          <span className="line-through text-[15px] text-[red] font-medium">
                            Rs. {val.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center mt-2">
                    <Link href={`/product/id/${val.slug}`}>
                      <div className="text-[14px] text-[#6467F2] font-normal">
                        View Details
                      </div>
                    </Link>
                    {val.stockQuantity === 0 ? (
                      <Button
                        className="px-5 py-4 text-[14px] font-bold bg-gray-500 text-white rounded-[200px] hover:bg-[#fffcfc]"
                        disabled
                      >
                        Out of stock
                      </Button>
                    ) : (
                      <Dialog
                        open={open}
                        onOpenChange={setOpen}
                        triggerText={
                          <Button
                            className="px-5 py-4 text-[14px] font-bold bg-white border border-[#4EA674] text-[#4EA674] rounded-[200px] "
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
                                  src={val.primaryImageUrl}
                                  alt={val.name}
                                  fill
                                  className="object-cover rounded-[12px]"
                                  unoptimized
                                />
                              </div>
                              <div>
                                <div className="text-[25px] font-bold">
                                  {val.name}
                                </div>
                                <div className="text-[16px] line-clamp-2">
                                  {val.shortDescription}
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
                                    selectedSizes[val.productId] ??
                                    defaultSizeId;
                                  return sizes.map((size) => {
                                    const isSelected =
                                      selectedSizeId === size.id;
                                    return (
                                      <div
                                        key={size.id}
                                        onClick={() =>
                                          handleSelectSize(
                                            val.productId,
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
                                  selectedSizes[val.productId] ?? defaultSizeId;
                                const selectedSizeValue = sizes.find(
                                  (s) => s.id === selectedSizeId,
                                )?.value;
                                handleAddToCart(
                                  val.productId,
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
                    )}
                  </div>
                </Card>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
