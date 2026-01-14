"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/ui/input";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiMinus } from "react-icons/fi";
import { Edit, Save } from "lucide-react";
import { usePostSocial } from "@/hooks/socialLinks/usePostSocial";
import { useEditSocial } from "@/hooks/socialLinks/useEditSocial";
import { useDeleteSocial } from "@/hooks/socialLinks/useDeleteSocial";
import { useFetchSocial } from "@/hooks/socialLinks/useFetchSocial";
import { SocialLinkSchema } from "./schemas/SocialLink.zod";
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
  const addSocialLinks = usePostSocial();
  const updateSocialLinks = useEditSocial();
  const deleteSocialLink = useDeleteSocial();
  const { data, refetch } = useFetchSocial();
  const {
    register,
    // handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SocialLinkSchema), mode: "all" });

  const facebook =
    data?.links?.find((v) => v.platform === "Facebook")?.profileLinkUrl ?? "";
  const instagram =
    data?.links?.find((v) => v.platform === "Instagram")?.profileLinkUrl ?? "";
  const twitter =
    data?.links?.find((v) => v.platform === "Twitter")?.profileLinkUrl ?? "";

  const facebookId =
    data?.links?.find((v) => v.platform === "Facebook")?.socialLinkId ?? "";
  const instagramId =
    data?.links?.find((v) => v.platform === "Instagram")?.socialLinkId ?? "";
  const twitterId =
    data?.links?.find((v) => v.platform === "Twitter")?.socialLinkId ?? "";

  useEffect(() => {
    reset({
      facebook,
      instagram,
      twitter,
    });
  }, [facebook, instagram, twitter, reset]);

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
      if (facebookId) {
        updateSocialLinks.mutate(
          {
            socialLinkId: facebookId,
            socialData: facebookData,
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
        );
      } else {
        addSocialLinks.mutate(
          { socialData: facebookData },
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
      }
    } else if (link === "Instagram") {
      const instagramLink = watch("instagram");
      const instagramData: SocialLink = {
        socialLinkId: 2,
        platform: "Instagram",
        profileLinkUrl: instagramLink ?? "",
        createdAt: new Date().toISOString(),
      };
      if (instagramId) {
        updateSocialLinks.mutate(
          {
            socialLinkId: instagramId,
            socialData: instagramData,
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
        );
      } else {
        addSocialLinks.mutate(
          { socialData: instagramData },
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
      }
    } else if (link === "Twitter") {
      const xLink = watch("twitter");
      const xProfileUrl = Array.isArray(xLink)
        ? (xLink[0] ?? "")
        : (xLink ?? "");
      const xData: SocialLink = {
        socialLinkId: 2,
        platform: "X",
        profileLinkUrl: xProfileUrl,
        createdAt: new Date().toISOString(),
      };
      if (twitterId) {
        updateSocialLinks.mutate(
          {
            socialLinkId: twitterId,
            socialData: xData,
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
        );
      } else {
        addSocialLinks.mutate(
          { socialData: xData },
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
    }
    reset();
  };

  return (
    <Card
      className="p-2 shadow-lg border-0 justify-between items-start relative "
      cardClassName="p-0 border-none shadow-none rounded-2xl overflow-hidden"
    >
      <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
        Update your social links
      </h3>
      <form className="mt-4 sm:mt-5 flex flex-col gap-3 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1 relative">
            <label className="text-md font-medium text-gray-700">
              Facebook
            </label>
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
            <label className="text-md font-medium text-gray-700">
              Instagram
            </label>
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
            <label className="text-md font-medium text-gray-700">X</label>
            <Input
              type="text"
              {...register("twitter")}
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
            {twitterId && twitter !== "" && (
              <div
                className="absolute right-0 top-0 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 cursor-pointer"
                onClick={() => deleteSocialLink.mutate(twitterId)}
              >
                <FiMinus className="text-xl text-white" />
              </div>
            )}
          </div>
          {errors.twitter && (
            <p className="text-sm text-red-600 mt-1">
              {errors.twitter.message}
            </p>
          )}
        </div>
      </form>
    </Card>
  );
};
