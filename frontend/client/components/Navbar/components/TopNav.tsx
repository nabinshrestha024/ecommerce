"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Image from "next/image";
import Link from "next/link";
import { FaBell, FaLocationDot, FaUserLarge } from "react-icons/fa6";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSearch } from "@/hooks/search/useSearch";
import { useDebounce } from "@/hooks/search/useDebounce";
import { CartComponent } from "./CartComponent";
import { useFetchProfile } from "@/hooks/profile/useFetchProfile";
import { ConfirmationDialog } from "@/components/ConfirmationDialog/ConfirmationDialog";
import { Sidebar } from "./Sidebar";
import { IoLogOut } from "react-icons/io5";
import { Notification } from "@/components/Notification/Notification";
import { DropDown } from "@/components/DropDown/DropDown";

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
  const [profileOpen, setProfileOpen] = useState(false);

  const handleProfile = () => {
    setProfileOpen(true);
  };

  return (
    <div className="w-full bg-white flex justify-between px-5 lg:px-10 items-center py-5 border-b">
      <div className="flex gap-2 md:divide-x-2">
        <Link href={"#top"}>
          <Image
            src={"/logo.png"}
            alt="Logo"
            height={80}
            width={180}
            className="hidden lg:block cursor-pointer"
            onClick={() => router.push("/home")}
          />
        </Link>
        <Image
          src={"/logo.png"}
          alt="Logo"
          height={80}
          width={120}
          className="lg:hidden cursor-pointer"
          onClick={() => router.push("/home")}
        />
        <div className="items-center gap-2 hidden md:flex">
          <FaLocationDot className="text-xl" />
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
        <div className="relative w-[400px] hidden lg:flex ">
          <Input
            type="text"
            value={searchData}
            placeholder="What are you looking for....."
            onChange={(e) => setSearchData(e.target.value)}
            className=" h-12 rounded-3xl pr-24 hover:cursor-text"
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
                        src={`${product?.images[0]?.imageUrl}`}
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
        <Notification />
        <CartComponent />

        {isAuth ? (
          <DropDown
            side="bottom"
            align="end"
            sideOffset={15}
            alignOffset={-10}
            trigger={<FaUserLarge size={19} className="cursor-pointer" />}
          >
            <div className="w-[150px] flex flex-col gap-2">
              <Link href="/profile" className="text-sm px-2 py-1 border-b">
                My Profile
              </Link>

              <ConfirmationDialog
                trigger={
                  <button className="flex items-center gap-2 text-sm rounded px-2 py-1">
                    <IoLogOut size={16} />
                    Logout
                  </button>
                }
                confirmFunc={logout}
                description="Are you sure you want to logout?"
              />
            </div>
          </DropDown>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>

      <div className="md:hidden">
        <Sidebar />
      </div>
    </div>
  );
};
