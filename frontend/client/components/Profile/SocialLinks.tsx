"use client";

import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/ui/input";
import { Card } from "../Card/Card";
import { SocialLinksSchema } from "./schemas/SocialLinks.zod";
import { useEffect, useState } from "react";
import { useAddSocialLinks } from "@/hooks/socialLinks/useAddSocialLinks";
import { useFetchSocialLinks } from "@/hooks/socialLinks/useFetchSocialLinks";
import { useUpdateSocialLinks } from "@/hooks/socialLinks/useUpdateSocialLinks";
import { toast } from "sonner";
import { useDeleteSocialLinks } from "@/hooks/socialLinks/useDeleteSocialLinks";
import { FiMinus } from "react-icons/fi";
import { Edit, Save, SquarePen } from "lucide-react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
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
      className="p-5 border-0 justify-between items-start relative "
      rootClassName="p-0 border-none shadow-none rounded-2xl overflow-hidden "
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-5" id="links">
        Update your social links
      </h3>
      <form className="flex flex-col gap-5 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm sm:text-base">Facebook</label>
            <Input
              type="text"
              {...register("facebook")}
              disabled={!(isEditing === "Facebook")}
              className={`w-full mt-2 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all ${errors.facebook ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              placeholder="Facebook Profile URL"
            />
            {isEditing === "Facebook" ? (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => handleSave("Facebook")}
              >
                <Save size={20} className="text-gray-500" />
              </div>
            ) : (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => setIsEditing("Facebook")}
              >
                <MdEdit size={20} className="text-gray-500" />
              </div>
            )}
            {facebookId && facebook !== "" && (
              <div
                className="absolute right-0 top-0 h-5 w-5 flex items-center justify-center "
                onClick={() => deleteSocialLink.mutate(facebookId)}
              >
                <FaTrash className="text-[18px] text-gray-500" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm sm:text-base">Instagram</label>
            <Input
              type="text"
              {...register("instagram")}
              disabled={!(isEditing === "Instagram")}
              className={`w-full mt-2 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all ${errors.instagram?.message ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              placeholder="Instagram Profile URL"
            />
            {isEditing === "Instagram" ? (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => handleSave("Instagram")}
              >
                <Save size={20} className="text-gray-500" />
              </div>
            ) : (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => setIsEditing("Instagram")}
              >
                <MdEdit size={20} className="text-gray-500" />
              </div>
            )}
            {instagramId && instagram !== "" && (
              <div
                className="absolute right-0 top-0 h-5 w-5 flex items-center justify-center"
                onClick={() => deleteSocialLink.mutate(instagramId)}
              >
                <FaTrash className="text-[14px] text-gray-500" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm sm:text-base">X</label>
            <Input
              type="text"
              {...register("x")}
              disabled={!(isEditing === "X")}
              className={`w-full mt-2 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all ${errors.x ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              placeholder="X Profile URL"
            />
            {isEditing === "X" ? (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => handleSave("X")}
              >
                <Save size={20} className="text-gray-500" />
              </div>
            ) : (
              <div
                className="absolute right-7 top-0 flex items-center justify-center cursor-pointer"
                onClick={() => setIsEditing("X")}
              >
                <MdEdit size={20} className="text-gray-500" />
              </div>
            )}
            {xId && x !== "" && (
              <div
                className="absolute right-0 top-0 h-5 w-5 flex items-center justify-center "
                onClick={() => deleteSocialLink.mutate(xId)}
              >
                <FaTrash className="text-[14px] text-gray-500" />
              </div>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
};
