"use client";

import { Card } from "@/components/Card/Card";
import { Button } from "@/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useProduct } from "@/hooks/product/useProduct";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useAddWishlist } from "@/hooks/wishlist/useAddWishlist";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";
import { Dialog } from "@/components/Dialog/Dialog";
import { DialogClose, DialogTitle } from "@/ui/dialog";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export interface WishlistItem {
  productId: number;
  primaryImageUrl: string;
  name: string;
  shortDescription: string;
  price: number;
  id: number;
}

export type wishlistData = number;

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

export const TrendingProductCard = () => {
  const stockValue = 20;
  const [quantity, setQuantity] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<
    Record<number, number | null>
  >({});
  const { data, isLoading, isError } = useProduct();
  const addMutate = useAddWishlist();
  const deleteMutate = useDeleteWishlist();
  const wishlists = useFetchWishlist();
  const addToCart = useAddToCart();
  const { token } = useAuth();

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
      // console.log("Product: ", productId);
      // console.log("Quantity: ", quantity);
      // console.log("Size: ", sizeValue);
    } else {
      toast.message("Login to add to cart");
    }
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
    console.log(productId);
    deleteMutate.mutate(productId);
  };

  const handleSelectSize = (productId: number, sizeId: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeId }));
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>An Error Occured</div>
  ) : (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.items?.map(
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
                    unoptimized
                  />
                  {product.stockQuantity === 0 && (
                    <div className="absolute top-3 left-3 px-1 rounded-sm text-white bg-gray-500 font-bold flex justify-center items-center cursor-pointer">
                      Out of Stock
                    </div>
                  )}
                  <div className="absolute top-3 right-3 rounded-full w-6 h-6 shadow-sm flex justify-center items-center cursor-pointer">
                    {wishedIds.has(product.productId) ? (
                      <IoIosHeart
                        size={16}
                        className="text-red-600"
                        onClick={() => handleDeleteWishlist(product.productId)}
                      />
                    ) : (
                      <IoIosHeartEmpty
                        size={16}
                        className="text-gray-400"
                        onClick={() => handleAddWishlist(product.productId)}
                      />
                    )}
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
                    {[...Array(5)]?.map((_, i) => (
                      <Star key={i} size={16} className="text-gray-300" />
                    ))}
                  </div>

                  <div className="text-[14px] text-[#4EA674] font-bold">
                    Rs. {product.price}
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                <Link href={`/product/id/${product.slug}`}>
                  <span className="text-[14px] text-[#6467F2]">
                    View Details
                  </span>
                </Link>
                {product.stockQuantity === 0 ? (
                  <Button
                    className="px-5 py-4 text-[14px] font-bold bg-gray-500 text-white rounded-[200px] hover:bg-[#fffcfc]"
                    disabled
                  >
                    Out of stock
                  </Button>
                ) : (
                  <Dialog
                    triggerText={
                      <Button
                        className="px-5 py-4 text-[14px] font-bold bg-white border border-[#4EA674] text-[#4EA674] rounded-[200px] hover:bg-[#fffcfc]"
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
                              src={product.primaryImageUrl}
                              alt={product.name}
                              fill
                              className="object-cover rounded-[12px]"
                              unoptimized
                            />
                          </div>
                          <div>
                            <div className="text-[25px] font-bold">
                              {product.name}
                            </div>
                            <div className="text-[16px] line-clamp-2">
                              {product.shortDescription}
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
                                selectedSizes[product.productId] ??
                                defaultSizeId;
                              return sizes.map((size) => {
                                const isSelected = selectedSizeId === size.id;
                                return (
                                  <div
                                    key={size.id}
                                    onClick={() =>
                                      handleSelectSize(
                                        product.productId,
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
                              selectedSizes[product.productId] ?? defaultSizeId;
                            const selectedSizeValue = sizes.find(
                              (s) => s.id === selectedSizeId,
                            )?.value;
                            handleAddToCart(
                              product.productId,
                              quantity,
                              selectedSizeValue,
                            );
                          }}
                          className="px-4 py-2 bg-[#4EA674] text-white"
                        >
                          Add to Cart
                        </Button>
                      </DialogClose>
                    </div>
                  </Dialog>
                )}
              </div>
            </Card>
          ),
      )}
    </div>
  );
};
