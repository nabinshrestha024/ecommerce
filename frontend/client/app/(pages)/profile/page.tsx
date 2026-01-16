"use client";

import { ChangeEvent, useRef, useState } from "react";
import { format } from "timeago.js";
import { useOrder } from "@/hooks/orders/useOrder";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import { ProfileUpdate } from "@/components/Profile/ProfileUpdate";
import { useFetchProfile } from "@/hooks/profile/useFetchProfile";
import { useQueryState } from "nuqs";
import { useFetchSocialLinks } from "@/hooks/socialLinks/useFetchSocialLinks";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Spinner } from "@/ui/spinner";
import { ProfileCropDialog } from "@/components/Profile/ProfileCropDialog";

export default function UserProfile() {
  const { data, isLoading } = useFetchProfile();
  const orders = useOrder();
  const wishlist = useFetchWishlist();
  const socialLinks = useFetchSocialLinks();

  const [cropOpen, setCropOpen] = useState<boolean>(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  return isLoading || orders.isLoading || socialLinks.isLoading ? (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
      <Spinner className="size-8" />
    </div>
  ) : (
    <div className="w-full">
      <div className="min-h-screen bg-gray-50">
        <div className="mx:2 lg:mx-25 p-3 md:p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4 relative">
                <div className=" w-20 h-20 shadow-xl  rounded-full flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden">
                  <Image
                    src={data.profileImageUrl}
                    alt="Profile Picture"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-0.5 left-15 bg-gray-50 p-1 py-2 rounded-full hover:cursor-pointer shadow-2xl"
                  onClick={() => fileRef.current?.click()}
                >
                  <Camera className="h-4" color="black" />
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = URL.createObjectURL(file);
                    setCropImageSrc(url);
                    setCropOpen(true);
                  }}
                />
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
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t ">
              <div className="text-center hover:cursor-pointer">
                <div className="text-2xl font-bold text-gray-900">
                  {Array.isArray(orders?.data) ? orders.data.length : 0}
                </div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="text-center hover:cursor-pointer">
                <div className="text-2xl font-bold text-gray-900">
                  {Array.isArray(wishlist?.data?.items)
                    ? wishlist.data.items.length
                    : 0}
                </div>
                <div className="text-sm text-gray-600">Wishlist</div>
              </div>
              <div className="text-center hover:cursor-pointer">
                <div className="text-2xl font-bold text-gray-900">
                  {socialLinks.data?.links.length}
                </div>
                <div className="text-sm text-gray-600">Social Links</div>
              </div>
            </div>
          </div>
          <ProfileUpdate />
        </div>
      </div>
      {cropImageSrc && (
        <ProfileCropDialog
          image={cropImageSrc}
          open={cropOpen}
          onClose={() => {
            setCropOpen(false);
            if (cropImageSrc) {
              URL.revokeObjectURL(cropImageSrc);
              setCropImageSrc(null);
            }
          }}
          onSave={async () => {
            try {
              await data.refetch();
            } catch {
              // ignore
            }
            setCropOpen(false);
            if (cropImageSrc) {
              URL.revokeObjectURL(cropImageSrc);
              setCropImageSrc(null);
            }
          }}
        />
      )}
    </div>
  );
}
