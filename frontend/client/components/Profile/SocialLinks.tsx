"use client";

import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/ui/input";
import { Card } from "../Card/Card";
import {
  SocialLinksSchema,
  SocialLinksSchemaType,
} from "./schemas/SocialLinks.zod";
import { useEffect, useState } from "react";
import { useAddSocialLinks } from "@/hooks/socialLinks/useAddSocialLinks";
import { useFetchSocialLinks } from "@/hooks/socialLinks/useFetchSocialLinks";
import { useUpdateSocialLinks } from "@/hooks/socialLinks/useUpdateSocialLinks";
import { toast } from "sonner";
import { useDeleteSocialLinks } from "@/hooks/socialLinks/useDeleteSocialLinks";
import { FiMinus } from "react-icons/fi";
import { SquarePen } from "lucide-react";
export interface SocialLink {
  socialLinkId: number;
  platform: "Instagram" | "Facebook" | "X";
  profileLinkUrl: string;
  createdAt: string;
}
type SocialLinksResponse = {
  message: string;
  links: SocialLink[];
};
export const SocialLinks = ({ data }: { data: SocialLinksResponse }) => {
  const addSocialLinks = useAddSocialLinks();
  const updateSocialLinks = useUpdateSocialLinks();
  const deleteSocialLink = useDeleteSocialLinks();
  const { refetch } = useFetchSocialLinks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SocialLinksSchema), mode: "all" });

  const facebook =
    data?.links?.find((v) => v.platform === "Facebook")?.profileLinkUrl ?? "";
  const instagram =
    data?.links?.find((v) => v.platform === "Instagram")?.profileLinkUrl ?? "";
  const x = data?.links?.find((v) => v.platform === "X")?.profileLinkUrl ?? "";

  const facebookId =
    data?.links?.find((v) => v.platform === "Facebook")?.socialLinkId ?? "";
  const instagramId =
    data?.links?.find((v) => v.platform === "Instagram")?.socialLinkId ?? "";
  const xId = data?.links?.find((v) => v.platform === "X")?.socialLinkId ?? "";

  useEffect(() => {
    reset({
      facebook,
      instagram,
      x,
    });
  }, [facebook, instagram, x, reset]);

  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (data: SocialLinksSchemaType) => {
    const instagramData: SocialLink = {
      socialLinkId: 1,
      platform: "Instagram",
      profileLinkUrl: data.instagram ?? "",
      createdAt: new Date().toISOString(),
    };
    const facebookData: SocialLink = {
      socialLinkId: 2,
      platform: "Facebook",
      profileLinkUrl: data.facebook ?? "",
      createdAt: new Date().toISOString(),
    };
    const xData: SocialLink = {
      socialLinkId: 3,
      platform: "X",
      profileLinkUrl: data.x ?? "",
      createdAt: new Date().toISOString(),
    };
    await Promise.all([
      instagramId
        ? updateSocialLinks.mutateAsync({
            id: instagramId,
            data: instagramData,
          })
        : addSocialLinks.mutateAsync({ data: instagramData }),
      facebookId
        ? updateSocialLinks.mutateAsync({
            id: facebookId,
            data: facebookData,
          })
        : addSocialLinks.mutateAsync({ data: facebookData }),
      xId
        ? updateSocialLinks.mutateAsync({
            id: xId,
            data: xData,
          })
        : addSocialLinks.mutateAsync({ data: xData }),
    ]);
    toast.success("Social Links Updated Successfully");
    refetch();
    reset();
  };
  return (
    <Card
      className="flex flex-col shadow-[0px_1px_3px_0px_#00000033] w-full rounded-xl px-0 overflow-hidden"
      rootClassName="p-0 border-none shadow-none rounded-xl"
    >
      <div className="bg-[#4EA674] px-6 py-8 sm:px-8 ">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-1">
              Profile Settings
            </h2>
            <p className="text-blue-100 text-sm">
              Manage your personal information
            </p>
          </div>
          <button
            className={`rounded-xl p-3 transition-all duration-200 ${
              isEditing
                ? "bg-white text-[#4EA674] shadow-md hover:shadow-lg"
                : " text-white"
            }`}
            onClick={() => setIsEditing((val) => !val)}
            aria-label={isEditing ? "Cancel editing" : "Edit profile"}
          >
            <SquarePen className="h-5 w-5" />
          </button>
        </div>
      </div>
      <form
        className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4 py-4 px-4 sm:py-6 sm:px-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm sm:text-base">Facebook</label>
            <Input
              type="text"
              {...register("facebook")}
              disabled={!isEditing}
              className="w-full mt-2 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
              placeholder="Facebook Profile URL"
            />
            {facebookId && facebook !== "" && (
              <div
                className="absolute right-0 top-0 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 cursor-pointer"
                onClick={() => deleteSocialLink.mutate(facebookId)}
              >
                <FiMinus className="text-xl text-white" />
              </div>
            )}
            {errors.facebook && (
              <p className="text-sm text-red-600 mt-1">
                {errors.facebook.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm sm:text-base">Instagram</label>
            <Input
              type="text"
              {...register("instagram")}
              disabled={!isEditing}
              className="w-full mt-2 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
              placeholder="Instagram Profile URL"
            />
            {instagramId && instagram !== "" && (
              <div
                className="absolute right-0 top-0 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 cursor-pointer"
                onClick={() => deleteSocialLink.mutate(instagramId)}
              >
                <FiMinus className="text-xl text-white" />
              </div>
            )}
            {errors.instagram && (
              <p className="text-sm text-red-600 mt-1">
                {errors.instagram.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm sm:text-base">X</label>
            <Input
              type="text"
              {...register("x")}
              disabled={!isEditing}
              className="w-full mt-2 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
              placeholder="X Profile URL"
            />
            {xId && x !== "" && (
              <div
                className="absolute right-0 top-0 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 cursor-pointer"
                onClick={() => deleteSocialLink.mutate(xId)}
              >
                <FiMinus className="text-xl text-white" />
              </div>
            )}
          </div>
          {errors.x && (
            <p className="text-sm text-red-600 mt-1">{errors.x.message}</p>
          )}
        </div>
        {isEditing && (
          <Button
            className="mt-3 sm:mt-4 h-10 w-full text-sm sm:text-base"
            variant={"default"}
            type="submit"
          >
            Update Social Links
          </Button>
        )}
      </form>
    </Card>
  );
};
