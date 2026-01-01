import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { Card } from "../Card/Card";
import { CirclePlus } from "lucide-react";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxCross1 } from "react-icons/rx";
import { FiMinusCircle } from "react-icons/fi";
import {
  SocialLinkSchema,
  type SocialLinkType,
} from "../profile/schemas/SocialLink.zod";
import { Button } from "@/ui/button";
import { usePostSocial } from "@/hooks/socialLinks/usePostSocial";
import { toast } from "sonner";
import { useFetchSocial } from "@/hooks/socialLinks/useFetchSocial";
import { useEditSocial } from "@/hooks/socialLinks/useEditSocial";
import { useDeleteSocial } from "@/hooks/socialLinks/useDeleteSocial";
interface SocialLink {
  socialLinkId: number;
  platform: "Instagram" | "Facebook" | "Twitter";
  profileLinkUrl: string;
  createdAt: string;
}
export const ShortProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SocialLinkSchema),
    mode: "onChange",
  });
  const [remove, setRemove] = useState("");
  const profile = useGetProfile();
  const [socialLink, setSocialLink] = useState<boolean>(false);

  const handleSociallink = () => {
    setSocialLink(!socialLink);
  };

  const postSocial = usePostSocial();
  const getSocial = useFetchSocial();
  const editSocial = useEditSocial();
  const deleteSocial = useDeleteSocial();

  const facebook =
    getSocial.data?.find((v) => v.platform === "Facebook")?.profileLinkUrl ??
    "";
  const instagram =
    getSocial.data?.find((v) => v.platform === "Instagram")?.profileLinkUrl ??
    "";
  const twitter =
    getSocial.data?.find((v) => v.platform === "Twitter")?.profileLinkUrl ?? "";

  const facebookId =
    getSocial.data?.find((v) => v.platform === "Facebook")?.socialLinkId ?? "";
  const instagramId =
    getSocial.data?.find((v) => v.platform === "Instagram")?.socialLinkId ?? "";
  const twitterId =
    getSocial.data?.find((v) => v.platform === "Twitter")?.socialLinkId ?? "";

  useEffect(() => {
    reset({
      facebook,
      instagram,
      twitter,
    });
  }, [facebook, instagram, twitter, reset]);

  const onSubmit = async (data: SocialLinkType) => {
    const facebookData: SocialLink = {
      socialLinkId: 1,
      platform: "Facebook",
      profileLinkUrl: data.facebook ?? "",
      createdAt: new Date().toISOString(),
    };

    const instagramData: SocialLink = {
      socialLinkId: 2,
      platform: "Instagram",
      profileLinkUrl: data.instagram ?? "",
      createdAt: new Date().toISOString(),
    };

    const twitterData: SocialLink = {
      socialLinkId: 3,
      platform: "Twitter",
      profileLinkUrl: data.twitter ?? "",
      createdAt: new Date().toISOString(),
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
    getSocial.refetch();
  };

  const socialIconMap: Record<string, string> = {
    Facebook: "profile/facebook.png",
    Instagram: "profile/instagram.png",
    Twitter: "profile/icons8-x.svg",
  };

  return (
    <Card
      className="flex flex-col shadow-[0px_1px_3px_0px_#00000033] w-full py-4 sm:py-6 px-4 sm:px-6 rounded-xl"
      cardClassName="p-0 border-none shadow-none rounded-xl"
    >
      <div className="flex flex-col">
        <div className="font-bold text-lg sm:text-[22px] leading-tight sm:leading-[26px] tracking-[0%]">
          Profile
        </div>
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 sm:h-24 sm:w-24 flex justify-center items-center rounded-full bg-gray-200 shadow-md mt-1 mb-2">
            <img
              src={
                profile.data?.profileImageUrl
                  ? `http://192.168.80.229/${profile.data.profileImageUrl}`
                  : "profile.webp"
              }
              alt="Profile"
              className="h-full w-full rounded-full object-cover border-2 border-white"
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
            Linked with Social Media
            <div className="flex justify-center gap-4">
              {getSocial.data?.map((social, index) => {
                const icon = socialIconMap[social.platform];
                if (!icon) return null;

                return (
                  <div
                    key={social.socialLinkId ?? index}
                    className="relative"
                    onMouseOver={() => setRemove(social.platform)}
                    onMouseLeave={() => setRemove("")}
                  >
                    <a
                      href={social.profileLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="h-10 w-10 rounded-full">
                        <img
                          src={icon}
                          alt={social.platform}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                    {remove === social.platform && (
                      <div
                        className=" absolute -top-3.5 -right-2"
                        onClick={() => deleteSocial.mutate(social.socialLinkId)}
                      >
                        <FiMinusCircle className="text-[16px] text-red-500 font-bold" />
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
              <CirclePlus size={16} />
              Social Media
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
                <div className="grid grid-cols-4 gap-4 mt-5">
                  <label className="col-span-1 font-medium text-gray-700">
                    Instagram
                  </label>
                  <div className="col-span-3">
                    <Input
                      type="text"
                      placeholder=""
                      {...register("instagram")}
                      className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
                    />
                    {errors.instagram && (
                      <p className="text-[12px] text-red-500 ">
                        {errors.instagram.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-5">
                  <label className="col-span-1 font-medium text-gray-700">
                    Facebook
                  </label>
                  <div className="col-span-3">
                    <Input
                      type="text"
                      placeholder=""
                      {...register("facebook")}
                      className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
                    />
                    {errors.facebook && (
                      <p className="text-[12px] text-red-500 ">
                        {errors.facebook.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-5">
                  <label className="col-span-1 font-medium text-gray-700">
                    Twitter
                  </label>
                  <div className="col-span-3">
                    <Input
                      type="text"
                      placeholder=""
                      {...register("twitter")}
                      className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
                    />
                    {errors.twitter && (
                      <p className="text-[12px] text-red-500 ">
                        {errors.twitter.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button variant="default" type="submit" className="mt-2">
                  Update Social Link
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
