"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { Bell, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSearch } from "@/hooks/search/useSearch";
import { useDebounce } from "@/hooks/search/useDebounce";
import { Notification } from "@/components/Notification/Notification";
import { CartComponent } from "./CartComponent";
import { useFetchProfile } from "@/hooks/profile/useFetchProfile";
import { IoMdExit } from "react-icons/io";
import { ConfirmationDialog } from "@/components/ConfirmationDialog/ConfirmationDialog";
import { Sidebar } from "./Sidebar";

interface AttributeType {
  name: string;
  value: string;
}

export interface CartProductType {
  userId: number;
  cartId: number;
  productId: number;
  variantId: number;

  productName: string;
  sku: string;
  productImageUrl: string;
  description: string;

  price: number;
  quantity: number;
  totalPrice: number;
  finalPrice: number;

  discountId: number | null;
  discountName: string | null;
  discountType: string | null;
  discountValue: number | null;
  discountAmount: number;

  addedDate: string;
  attributes: AttributeType[];
}

export const TopNav = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState("");
  const { data } = useFetchProfile();
  const { token, logout } = useAuth();
  const isAuth = Boolean(token);

  const debounceSearch = useDebounce(searchData, 500);

  useEffect(() => {
    if (!debounceSearch) return;
  }, [debounceSearch]);

  const search = useSearch(debounceSearch);
  return (
    <div className="flex justify-between px-5 lg:px-10 items-center py-5 border-b">
      <div className="flex gap-2 md:divide-x-2">
        <Image
          src={"/logo.png"}
          alt="Logo"
          height={80}
          width={180}
          className="hidden lg:block cursor-pointer"
          onClick={() => router.push("/home")}
        />
        <Image
          src={"/logo.png"}
          alt="Logo"
          height={80}
          width={120}
          className="lg:hidden cursor-pointer"
          onClick={() => router.push("/home")}
        />
        <div className="items-center gap-2 hidden md:flex">
          <FaLocationDot className="text-2xl" />
          <div>
            <div className="text-xs">Deliver to</div>
            {isAuth ? (
              <div className="text-sm font-semibold">{data?.address}</div>
            ) : (
              <div className="text-sm font-semibold">Your address</div>
            )}
          </div>
        </div>
      </div>
      <div className="gap-4 items-center hidden md:flex">
        <div className="relative w-[400px] hidden lg:flex">
          <Input
            type="text"
            value={searchData}
            placeholder="What are you looking for....."
            onChange={(e) => setSearchData(e.target.value)}
            className="bg-[#EAF8E7] h-12 rounded-3xl pr-24"
          />

          <Search
            className="rounded-3xl absolute right-2 top-1/2 -translate-y-1/2 mr-3"
            size={16}
            color="gray"
          />

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

              {search.data?.items.length === 0 ? (
                <div className="text-center text-[13px] p-3 cursor-pointer">
                  No products found
                </div>
              ) : (
                search.data?.items.map((product) => (
                  <div
                    key={product.productId}
                    onClick={() => {
                      setTimeout(() => {
                        router.push(`/product/id/${product.slug}`);
                      }, 1000);
                      setSearchData("");
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-[#EAF8E7] cursor-pointer"
                  >
                    <div className="w-10 h-10 relative rounded overflow-hidden">
                      <Image
                        src={`http://192.168.80.242${product?.images[0]?.imageUrl}`}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="text-sm font-medium">{product.name}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {isAuth ? (
          <Link href="/profile">
            <User />
          </Link>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}

        {!isAuth ? (
          <Bell
            onClick={() =>
              toast.error("Please log in to see your notifications")
            }
            className="cursor-pointer"
          />
        ) : (
          <Notification />
        )}

        <CartComponent />

        {isAuth && (
          <ConfirmationDialog
            trigger={<IoMdExit className="text-xl text-black cursor-pointer" />}
            confirmFunc={logout}
            description="Are you sure you want to logout?"
          />
        )}
      </div>

      <div className="md:hidden">
        <Sidebar />
      </div>
    </div>
  );
};
