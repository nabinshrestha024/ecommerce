import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { Camera, Save, Settings, SquarePen, Trash } from "lucide-react";
import { Copy } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";
import { useFetchSocial } from "@/hooks/socialLinks/useFetchSocial";
import { useEditSocial } from "@/hooks/socialLinks/useEditSocial";
import { useDeleteSocial } from "@/hooks/socialLinks/useDeleteSocial";
import { usePostSocial } from "@/hooks/socialLinks/usePostSocial";
import type { Social } from "@/lib/socialLinks/editSocial";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Dialog, DialogContent } from "@/ui/dialog";
import {
  SocialLinkSchema,
  type SocialLinkType,
} from "@/components/Profile/schemas/SocialLink.zod";
import { Card } from "@/components/Card/Card";
import { socialIconMap } from "@/components/Profile/socialIconMap.import";
import { Input } from "@/components/Input/Input";
import { ProfileUpdate } from "@/components/Profile/ProfileUpdate";
import { ChangePassword } from "@/components/Profile/ChangePassword";
import { ProfileCropDialog } from "@/components/Profile/ChangeProfile";

export interface SocialLink {
  platform: "Instagram" | "Facebook" | "Twitter";
  profileLinkUrl: string;
}
export const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SocialLinkSchema),
    mode: "onChange",
  });
  const profile = useGetProfile();
  const [socialLink, setSocialLink] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSociallink = () => {
    setSocialLink(!socialLink);
  };

  const postSocial = usePostSocial();
  const { data, refetch } = useFetchSocial();
  const editSocial = useEditSocial();
  const deleteSocial = useDeleteSocial();

  const facebook =
    data?.links.find((v) => v.platform === "Facebook")?.profileLinkUrl ?? "";
  const instagram =
    data?.links.find((v) => v.platform === "Instagram")?.profileLinkUrl ?? "";
  const twitter =
    data?.links.find((v) => v.platform === "Twitter")?.profileLinkUrl ?? "";

  const facebookId =
    data?.links.find((v) => v.platform === "Facebook")?.socialLinkId ?? "";
  const instagramId =
    data?.links.find((v) => v.platform === "Instagram")?.socialLinkId ?? "";
  const twitterId =
    data?.links.find((v) => v.platform === "Twitter")?.socialLinkId ?? "";

  useEffect(() => {
    reset({
      facebook,
      instagram,
      twitter,
    });
  }, [facebook, instagram, twitter, reset]);

  const onSubmit = async (data: SocialLinkType) => {
    const facebookData: SocialLink = {
      platform: "Facebook",
      profileLinkUrl: data.facebook ?? "",
    };

    const instagramData: SocialLink = {
      platform: "Instagram",
      profileLinkUrl: data.instagram ?? "",
    };

    const twitterData: SocialLink = {
      platform: "Twitter",
      profileLinkUrl: data.twitter ?? "",
    };

    await Promise.all([
      facebookId
        ? editSocial.mutateAsync({
            socialLinkId: facebookId,
            socialData: facebookData,
          })
        : postSocial.mutateAsync({ socialData: facebookData }),
      instagramId
        ? editSocial.mutateAsync({
            socialLinkId: instagramId,
            socialData: instagramData,
          })
        : postSocial.mutateAsync({ socialData: instagramData }),
      twitterId
        ? editSocial.mutateAsync({
            socialLinkId: twitterId,
            socialData: twitterData,
          })
        : postSocial.mutateAsync({ socialData: twitterData }),
    ]);
    toast.success("Social Links Updated Successfully");
    refetch();
  };

  const handleEdit = (socialLinkId: number, socialData: Social) => {
    setEditingId(socialLinkId);
    setValue(
      socialData.platform.toLowerCase() as "instagram" | "facebook" | "twitter",
      socialData.profileLinkUrl ?? "",
    );
  };

  const handleSave = async (socialLinkId: number, platform: string) => {
    const field = platform.toLowerCase() as
      | "instagram"
      | "facebook"
      | "twitter";
    const url = (getValues(field) ?? "").trim();
    const payload: SocialLink = {
      platform: platform as SocialLink["platform"],
      profileLinkUrl: url,
    };

    try {
      if (socialLinkId) {
        await editSocial.mutateAsync({ socialLinkId, socialData: payload });
      } else {
        await postSocial.mutateAsync({ socialData: payload });
      }
      toast.success("Social link saved");
      setEditingId(null);
      refetch();
    } catch {
      toast.error("Failed to save social link");
    }
  };

  const handleDelete = async (socialLinkId: number, platform: string) => {
    await deleteSocial.mutateAsync(socialLinkId);

    reset((prev) => ({
      ...prev,
      [platform.toLowerCase()]: "",
    }));

    refetch();
  };

  const [open, setOpen] = useState<boolean>(false);
  const [cropOpen, setCropOpen] = useState<boolean>(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  return (
    <Card
      className="flex flex-col shadow-[0px_1px_3px_0px_#00000033] w-full p-5 sm:py-6 px-4 sm:px-6 rounded-xl"
      cardClassName="p-5 border-none shadow-none rounded-xl relative"
    >
      <div className="flex flex-col mb-10">
        <div className="flex flex-col items-center">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex justify-center items-center rounded-full bg-gray-200 shadow-md mt-1 mb-2">
            <img
              src={profile.data?.profileImageUrl}
              alt="Profile"
              className="h-full w-full rounded-full object-cover border-2 border-white"
            />
            <div
              className="absolute bottom-0.5 -right-1 bg-white p-1 py-2 rounded-full hover:cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              <Camera className="h-4" />
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
          </div>
          <div className="font font-bold text-xl sm:text-[22px]">
            {profile.data?.fullName}
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-[16px] text-gray-400 text-center break-all px-2 sm:px-0">
            <span className="break-all">{profile.data?.email}</span>
            <Copy
              className="h-4 w-4 cursor-pointer hover:text-gray-600 transition-colors shrink-0"
              onClick={() =>
                navigator.clipboard.writeText(profile.data?.email ?? "")
              }
            />
          </div>
          <div className="flex justify-center items-center flex-col gap-4 mt-4 sm:mt-5 text-xs sm:text-[14px]">
            <div className="flex justify-center gap-6">
              {data?.links.map((social) => {
                const icon = socialIconMap[social.platform];
                const hasUrl = Boolean(social.profileLinkUrl);
                return (
                  <div key={social.socialLinkId} className="relative">
                    {hasUrl ? (
                      <a
                        href={social.profileLinkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="h-8 w-8 rounded-full">
                          <img
                            src={icon}
                            alt={social.platform}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </a>
                    ) : (
                      <div className="h-8 w-8 rounded-full opacity-50 cursor-not-allowed">
                        <img
                          src={icon}
                          alt={social.platform}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              className={`flex justify-center items-center rounded-md border gap-3 px-3 py-2 mt-2 border-[#E5E7EB] hover:bg-gray-50 w-full sm:w-auto ${socialLink && "hidden"}`}
              onClick={handleSociallink}
            >
              <SquarePen size={16} />
              Update social links
            </button>

            {socialLink && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative w-full flex flex-col gap-2 mt-4 border px-3 py-2 rounded-sm"
              >
                <div className="text-[14px] font-semibold text-center">
                  Update your social link
                </div>
                <div
                  className="absolute top-3 right-4 cursor-pointer"
                  onClick={() => setSocialLink(false)}
                >
                  <RxCross1 className="text-[16px] font-bold" />
                </div>
                {data?.links.map((val) => (
                  <div
                    key={val.socialLinkId}
                    className="flex justify-between items-start gap-4 mt-5"
                  >
                    <label className="font-medium text-gray-700 w-20">
                      {val.platform}
                    </label>
                    <div className="">
                      <Input
                        type="text"
                        disabled={editingId !== val.socialLinkId}
                        {...register(
                          val.platform.toLowerCase() as
                            | "instagram"
                            | "facebook"
                            | "twitter",
                        )}
                        className={`w-full h-7 px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0 transition-all ${
                          editingId !== val.socialLinkId
                            ? "bg-gray-50 cursor-not-allowed"
                            : "bg-white"
                        }`}
                        placeholder=""
                      />
                      {errors.instagram && (
                        <p className="text-[12px] text-red-500 ">
                          {errors.instagram.message}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {editingId === val.socialLinkId ? (
                        <Save
                          size={20}
                          className="hover:cursor-pointer"
                          onClick={() =>
                            handleSave(val.socialLinkId, val.platform)
                          }
                        />
                      ) : (
                        <SquarePen
                          size={20}
                          onClick={() =>
                            handleEdit(val.socialLinkId, {
                              platform: val.platform,
                              profileLinkUrl: val.profileLinkUrl,
                            })
                          }
                          className="hover:cursor-pointer"
                          color="grey"
                        />
                      )}

                      <Trash
                        size={20}
                        onClick={() =>
                          handleDelete(val.socialLinkId, val.platform)
                        }
                        className="hover:cursor-pointer"
                        color="red"
                      />
                    </div>
                  </div>
                ))}
              </form>
            )}
          </div>
        </div>
      </div>
      <ProfileUpdate />
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
              await profile.refetch();
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
      <HoverCard>
        <HoverCardTrigger className="absolute right-17">
          <Settings className="h-5 w-5" />
        </HoverCardTrigger>
        <HoverCardContent
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Change password
        </HoverCardContent>
      </HoverCard>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-lg">
          <ChangePassword />
        </DialogContent>
      </Dialog>
    </Card>
  );
};
