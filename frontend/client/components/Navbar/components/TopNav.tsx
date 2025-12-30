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
import { CartComponent } from "./CartComponent";

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
  const [searchData, setSearchData] = useState("");

  const { token, logout } = useAuth();
  const isAuth = Boolean(token);

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

        <CartComponent />
      </div>

      <div className="md:hidden">
        <Sidebar />
      </div>
    </div>
  );
};
