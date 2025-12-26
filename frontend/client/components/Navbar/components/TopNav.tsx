"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Input as Inp } from "@/components/input/Input";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Sidebar } from "./Sidebar";
import { Bell, Heart, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFetchCart } from "@/hooks/cart/useFetchCart";
import { useDeleteCart } from "@/hooks/cart/useDeleteCart";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSearch } from "@/hooks/search/useSearch";
import { useDebounce } from "@/hooks/search/useDebounce";
import { Notification } from "@/components/Notification/Notification";
import { Dialog } from "@/components/dialog/Dialog";
import { CheckoutForm } from "./CheckoutForm";

export interface CartProductType {
  cartId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  addedDate: string;
  productImageUrl: string;
  description: string;
}

export const TopNav = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const { data, isLoading, isError, error } = useFetchCart();
  const deleteCart = useDeleteCart();

  const totalPrice =
    data?.reduce((sum, val) => sum + val.quantity * val.price, 0) ?? 0;

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
    updateCart.mutate({
      cartId: cartId,
      quantity: quantity - 1,
    });
  };

  const debounceSearch = useDebounce(searchData, 500);

  useEffect(() => {
    if (!debounceSearch) return;
  }, [debounceSearch]);

  const search = useSearch(debounceSearch);

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
        <div className="relative w-[500px]">
          <Input
            type="text"
            value={searchData}
            placeholder="What you're looking for"
            onChange={(e) => setSearchData(e.target.value)}
            className="bg-[#EAF8E7] h-12 rounded-3xl pr-24"
          />

          <Button
            variant="ghost"
            className="bg-white rounded-3xl absolute right-2 top-1/2 -translate-y-1/2 "
          >
            <IoSearch />
            Search
          </Button>

          {debounceSearch && (
            <div className="absolute top-14 left-0 w-full bg-white shadow-lg  z-50 max-h-80 overflow-y-auto ">
              {search.isLoading && (
                <div className="p-4 text-sm text-gray-500">Searching...</div>
              )}

              {search.isError && (
                <div className="p-4 text-sm text-red-500">
                  Failed to fetch products
                </div>
              )}

              {search.data?.items.map((product) => (
                <div
                  key={product.productId}
                  onClick={() => {
                    router.push(`/product/id/${product.slug}`);
                    setSearchData("");
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-[#EAF8E7] cursor-pointer"
                >
                  <div className="w-10 h-10 relative rounded overflow-hidden">
                    <Image
                      src={product.primaryImageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium">{product.name}</div>
                </div>
              ))}
            </div>
          )}
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

        {isAuth && (
          <Link href={"/order"}>
            <Button variant={"secondary"}>Orders</Button>
          </Link>
        )}

        {!isAuth ? (
          <Heart
            onClick={() => toast.error("Please log in to access wishlist!")}
          />
        ) : (
          <Heart onClick={() => router.push("/wishlist")} />
        )}

        {!isAuth ? (
          <Bell
            onClick={() =>
              toast.error("Please log in to see your notifications")
            }
          />
        ) : (
          <Notification />
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
            className={`fixed right-0 top-0 z-20 h-screen transform ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 w-full max-w-md bg-white shadow-lg overflow-y-auto`}
            role="dialog"
            aria-label="Cart drawer"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <FaShoppingCart className="text-xl" />
                  <div className="text-lg font-semibold">Your Cart</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-500">
                    {data
                      ? `${data.length} item${data.length === 1 ? "" : "s"}`
                      : ""}
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded hover:bg-gray-100"
                    aria-label="Close cart"
                  >
                    <X />
                  </button>
                </div>
              </div>

              <div className="flex-1 px-6 py-4 space-y-4">
                {!isAuth ? (
                  <div className="py-12 text-center text-gray-600">
                    Please login to check your cart
                  </div>
                ) : isLoading ? (
                  <div className="py-12 text-center text-gray-600">
                    Loading...
                  </div>
                ) : isError ? (
                  <div className="py-12 text-center text-red-600">
                    {error?.message}
                  </div>
                ) : data?.length === 0 ? (
                  <div className="py-12 flex flex-col items-center gap-4">
                    <div className="text-lg font-semibold">
                      Your cart is empty
                    </div>
                    <div className="text-sm text-gray-500">
                      Add items you like to start shopping.
                    </div>
                    <Button
                      onClick={() => {
                        setOpen(false);
                        router.push("/product");
                      }}
                      className="mt-2"
                    >
                      Start shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data?.map((val) => (
                      <div key={val.cartId} className="flex gap-4 items-start">
                        <div className="w-20 h-20 relative rounded-md overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={
                              `http://192.168.80.229${val.productImageUrl}` ||
                              "/a.jpg"
                            }
                            fill
                            alt={val.productName}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-sm font-semibold text-gray-800">
                                {val.productName}
                              </div>
                              <div className="text-xs text-gray-600 line-clamp-2">
                                {val.description}
                              </div>
                            </div>
                            <button
                              className="p-1 hover:bg-red-50 rounded transition-colors ml-2"
                              title="Remove from cart"
                              onClick={() => deleteCart.mutate(val.cartId)}
                            >
                              <Trash2
                                size={16}
                                className="text-red-500 hover:text-red-600"
                              />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                              Price:{" "}
                              <span className="font-semibold">
                                ${val.price}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityDecrease({
                                    cartId: val.cartId,
                                    quantity: val.quantity,
                                  })
                                }
                                disabled={val.quantity <= 1}
                                className="p-1 rounded border disabled:opacity-50"
                                aria-label="Decrease quantity"
                              >
                                <MdKeyboardArrowDown />
                              </button>
                              <div className="px-3 py-1 border rounded">
                                {val.quantity}
                              </div>
                              <button
                                onClick={() =>
                                  updateCart.mutate({
                                    cartId: val.cartId,
                                    quantity: val.quantity + 1,
                                  })
                                }
                                className="p-1 rounded border"
                                aria-label="Increase quantity"
                              >
                                <MdKeyboardArrowUp />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {data?.length !== 0 && (
                <div className="px-6 py-4 border-t bg-white sticky bottom-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600">Grand Total</div>
                    <div className="text-2xl font-semibold text-green-600">
                      ${totalPrice}
                    </div>
                  </div>

                  <Dialog
                    triggerClassName="w-full"
                    triggerText={
                      <Button variant="default" className="w-full">
                        Checkout
                      </Button>
                    }
                  >
                    <CheckoutForm />
                  </Dialog>
                </div>
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
