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
import { Edit, Save, SquarePen } from "lucide-react";
export interface SocialLink {
  socialLinkId: number;
  platform: "Instagram" | "Facebook" | "X";
  profileLinkUrl: string;
  createdAt: string;
}

export interface SocialLinkType {
  message: string;
  links: SocialLink[];
}
export const SocialLinks = () => {
  const addSocialLinks = useAddSocialLinks();
  const updateSocialLinks = useUpdateSocialLinks();
  const deleteSocialLink = useDeleteSocialLinks();
  const { data, refetch } = useFetchSocialLinks();
  const {
    register,
    // handleSubmit,
    watch,
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

  const [isEditing, setIsEditing] = useState("");

  const handleSave = (link: string) => {
    if (link === "Facebook") {
      const fbLink = watch("facebook");
      const facebookData: SocialLink = {
        socialLinkId: 2,
        platform: "Facebook",
        profileLinkUrl: fbLink ?? "",
        createdAt: new Date().toISOString(),
      };
      facebookId
        ? updateSocialLinks.mutate(
            {
              id: facebookId,
              data: facebookData,
            },
            {
              onSuccess: () => {
                toast.success("Facebook URL updated successfully");
                setIsEditing("");
                refetch();
              },
              onError: () => {
                toast.error("Failed to update Facebook URL");
                setIsEditing("");
              },
            },
          )
        : addSocialLinks.mutate(
            { data: facebookData },
            {
              onSuccess: () => {
                toast.success("Facebook URL updated successfully");
                setIsEditing("");
                refetch();
              },
              onError: () => {
                toast.error("Failed to update Facebook URL");
                setIsEditing("");
              },
            },
          );
    } else if (link === "Instagram") {
      const instagramLink = watch("instagram");
      const instagramData: SocialLink = {
        socialLinkId: 2,
        platform: "Instagram",
        profileLinkUrl: instagramLink ?? "",
        createdAt: new Date().toISOString(),
      };
      instagramId
        ? updateSocialLinks.mutate(
            {
              id: instagramId,
              data: instagramData,
            },
            {
              onSuccess: () => {
                toast.success("Instagram URL updated successfully");
                setIsEditing("");
                refetch();
              },
              onError: () => {
                toast.error("Failed to update Instagram URL");
                setIsEditing("");
              },
            },
          )
        : addSocialLinks.mutate(
            { data: instagramData },
            {
              onSuccess: () => {
                toast.success("Instagram URL updated successfully");
                setIsEditing("");
                refetch();
              },
              onError: () => {
                toast.error("Failed to update Instagram URL");
                setIsEditing("");
              },
            },
          );
    } else if (link === "X") {
      const xLink = watch("x");
      const xData: SocialLink = {
        socialLinkId: 2,
        platform: "X",
        profileLinkUrl: xLink ?? "",
        createdAt: new Date().toISOString(),
      };
      xId
        ? updateSocialLinks.mutate(
            {
              id: xId,
              data: xData,
            },
            {
              onSuccess: () => {
                toast.success("X URL updated successfully");
                setIsEditing("");
                refetch();
              },
              onError: () => {
                toast.error("Failed to update X URL");
                setIsEditing("");
              },
            },
          )
        : addSocialLinks.mutate(
            { data: xData },
            {
              onSuccess: () => {
                toast.success("X URL updated successfully");
                setIsEditing("");
                refetch();
              },
              onError: () => {
                toast.error("Failed to update X URL");
                setIsEditing("");
              },
            },
          );
    }
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
        </div>
      </div>
      <form className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4 py-4 px-4 sm:py-6 sm:px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm sm:text-base">Facebook</label>
            <Input
              type="text"
              {...register("facebook")}
              disabled={!(isEditing === "Facebook")}
              className="w-full mt-2 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
              placeholder="Facebook Profile URL"
            />
            {isEditing === "Facebook" ? (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => handleSave("Facebook")}
              >
                <Save size={20} />
              </div>
            ) : (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => setIsEditing("Facebook")}
              >
                <Edit size={20} />
              </div>
            )}
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
              disabled={!(isEditing === "Instagram")}
              className="w-full mt-2 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
              placeholder="Instagram Profile URL"
            />
            {isEditing === "Instagram" ? (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => handleSave("Instagram")}
              >
                <Save size={20} />
              </div>
            ) : (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => setIsEditing("Instagram")}
              >
                <Edit size={20} />
              </div>
            )}
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
              disabled={!(isEditing === "X")}
              className="w-full mt-2 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
              placeholder="X Profile URL"
            />
            {isEditing === "X" ? (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => handleSave("X")}
              >
                <Save size={20} />
              </div>
            ) : (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => setIsEditing("X")}
              >
                <Edit size={20} />
              </div>
            )}
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
      </form>
    </Card>
  );
};
