"use client";

import { useState } from "react";
import { format } from "timeago.js";
import { useOrder } from "@/hooks/orders/useOrder";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import { Tabs } from "@/components/Tabs/Tabs";
import { ProfileUpdate } from "@/components/Profile/ProfileUpdate";
import { ChangePassword } from "@/components/Profile/ChangePassword";
import { Order } from "@/components/Order/Order";
import { Wishlist } from "@/components/Wishlist/Wishlist";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useFetchProfile } from "@/hooks/profile/useFetchProfile";
import { LogOut } from "lucide-react";
import { useQueryState } from "nuqs";
import { SocialLinks } from "@/components/Profile/SocialLinks";
import { useFetchSocialLinks } from "@/hooks/socialLinks/useFetchSocialLinks";

export default function UserProfile() {
  const { data, isLoading } = useFetchProfile();
  const orders = useOrder();
  const wishlist = useFetchWishlist();
  const socialLinks = useFetchSocialLinks();

  const tabsData = [
    {
      id: 1,
      value: "editProfile",
      triggerText: "Edit Profile",
      content: <ProfileUpdate />,
    },
    {
      id: 2,
      value: "socialLinks",
      triggerText: "Social Links",
      content: <SocialLinks data={socialLinks.data} />,
    },
    {
      id: 3,
      value: "changePassword",
      triggerText: "Change Password",
      content: <ChangePassword />,
    },
    {
      id: 4,
      value: "myOrders",
      triggerText: "Orders",
      content: <Order />,
    },
    {
      id: 5,
      value: "wishlist",
      triggerText: "Wishlist",
      content: <Wishlist />,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    router.push("/home");
    logout();
  };

  const [page, setPage] = useQueryState("page", {
    defaultValue: "editProfile",
  });

  return isLoading || orders.isLoading || socialLinks.isLoading ? (
    // || wishlist.isLoading
    <div>Loading....</div>
  ) : (
    <div className="w-full">
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto p-3 md:p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-linear-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials(data.fullName)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {data.fullName}
                  </h1>
                  <p className="text-gray-600">{data.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Joined {format(data.createdAt)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-red-500 flex gap-2"
              >
                <LogOut className="p-0.5" />{" "}
                <p className="hidden md:block">Log Out</p>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Array.isArray(orders?.data) ? orders.data.length : 0}
                </div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Array.isArray(wishlist?.data?.items)
                    ? wishlist.data.items.length
                    : 0}
                </div>
                <div className="text-sm text-gray-600">Wishlist</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
            </div>
          </div>
          <Tabs
            data={tabsData}
            defaultValue={page}
            tabsListClassName=" w-full bg-[#EAF8E7]"
            setPage={setPage}
          ></Tabs>
        </div>
      </div>
    </div>
  );
}
