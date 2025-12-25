"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Sidebar } from "./Sidebar";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFetchCart } from "@/hooks/cart/useFetchCart";
import { useDeleteCart } from "@/hooks/cart/useDeleteCart";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";

export interface CartProductType {
  cartId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  addedDate: string;
  image: string;
  description: string;
}

export const TopNav = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, error } = useFetchCart();
  const deleteCart = useDeleteCart();
  const calculateTotal = () => {
    let total = 0;
    data?.map((val) => {
      total = total + val.quantity * val.price;
    });
    return total;
  };

  const { token, logout } = useAuth();
  const isAuth = Boolean(token);
  const updateCart = useUpdateCart();

  const handleQuantityDecrease = ({
    cartId,
    quantity,
  }: {
    cartId: number;
    quantity: number;
  }) => {
    if (quantity > 1) {
      updateCart.mutate({
        cartId: cartId,
        quantity: quantity - 1,
      });
    } else {
      deleteCart.mutate(cartId);
    }
  };

  return (
    <div className="flex justify-between px-5 lg:px-10 items-center py-5 border-b">
      <div className="flex gap-2 divide-x-2">
        <Image
          src={"/logo.png"}
          alt="Logo"
          height={80}
          width={200}
          className="hidden lg:block"
        />
        <Image
          src={"/logo.png"}
          alt="Logo"
          height={80}
          width={120}
          className="lg:hidden"
        />
        <div className="flex items-center gap-2">
          <FaLocationDot className="text-2xl" />
          <div>
            <div className="text-xs">Deliver to</div>
            <div className="text-sm font-semibold">Your Address</div>
          </div>
        </div>
      </div>
      <div className="gap-4 items-center hidden lg:flex">
        <div className="relative">
          <Input
            type={"text"}
            placeholder="What you're looking for"
            className="bg-[#EAF8E7] shrink-0 w-[500px] h-12 rounded-3xl pr-25"
          />
          <Button
            variant={"ghost"}
            className="bg-white rounded-3xl absolute right-2 top-1/2 -translate-y-1/2"
          >
            <IoSearch />
            Search
          </Button>
        </div>
        {isAuth ? (
          <Link href="/home">
            <Button onClick={logout}>Logout</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}

        <div className="flex gap-2 shrink-0 items-center text-xl">
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <FaShoppingCart />
          </div>
          <div
            className="text-sm font-semibold cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Cart
          </div>
          <div
            className={`fixed right-0 top-0 z-20 h-screen w-[500px] bg-white ${open ? "tranlsate-x-0" : "translate-x-[500px]"} transition-all ease-in-out duration-500`}
          >
            <div className="relative px-10 pt-12 flex flex-col gap-5">
              <div
                className="absolute left-4 top-4"
                onClick={() => setOpen(false)}
              >
                <X />
              </div>
              {isLoading ? (
                <div>Loading...</div>
              ) : isError ? (
                <div>{error?.message}</div>
              ) : data?.length === 0 ? (
                <div>No items in cart</div>
              ) : (
                <>
                  {data?.map((val) => (
                    <div
                      key={val.cartId}
                      className={`flex gap-4 pb-4 border-b transition-opacity duration-300 `}
                    >
                      <div className="w-20 h-20 shrink-0 relative rounded-md overflow-hidden bg-gray-100">
                        <Image
                          src={val.image}
                          fill
                          alt={val.productName}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-800">
                            {val.productName}
                          </div>
                          <div className="text-xs text-gray-600 line-clamp-1">
                            {val.description}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-lg text-gray-700 flex gap-2">
                            <span className="font-semibold">$ {val.price}</span>{" "}
                            ×{" "}
                            <div className="flex items-center justify-center gap-2">
                              <div
                                onClick={() =>
                                  handleQuantityDecrease({
                                    cartId: val.cartId,
                                    quantity: val.quantity,
                                  })
                                }
                              >
                                <MdKeyboardArrowDown className="text-lg" />
                              </div>{" "}
                              {val.quantity}{" "}
                              <div
                                onClick={() =>
                                  updateCart.mutate({
                                    cartId: val.cartId,
                                    quantity: val.quantity + 1,
                                  })
                                }
                              >
                                <MdKeyboardArrowUp className="text-lg" />
                              </div>
                            </div>
                          </div>
                          <button
                            className="p-1 hover:bg-red-50 rounded transition-colors"
                            title="Remove from cart"
                            onClick={() => deleteCart.mutate(val.cartId)}
                          >
                            <Trash2
                              size={16}
                              className="text-red-500 hover:text-red-600"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-xl font-semibold flex items-center gap-2">
                    Grand Total:{" "}
                    <span className="text-3xl text-green-500">
                      ${calculateTotal()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <Sidebar />
      </div>
    </div>
  );
};
