import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { Camera } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { useFetchSocial } from "@/hooks/socialLinks/useFetchSocial";
import { Card } from "@/components/Card/Card";
import { socialIconMap } from "@/components/Profile/socialIconMap.import";
import { ProfileUpdate } from "@/components/Profile/ProfileUpdate";
import { ProfileCropDialog } from "@/components/Profile/ChangeProfile";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";

export interface SocialLink {
  platform: "Instagram" | "Facebook" | "Twitter";
  profileLinkUrl: string;
}
export const Profile = () => {
  const profile = useGetProfile();

  const { data } = useFetchSocial();

  const [cropOpen, setCropOpen] = useState<boolean>(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="mx-auto w-full max-w-5xl">
      <ProfileHeader />
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
                className="h-full w-full rounded-full object-cover"
              />
              <div
                className="absolute bottom-0.5 -right-1 bg-gray-50 p-1 py-2 rounded-full hover:cursor-pointer shadow-2xl"
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
            <div className="flex justify-center items-center flex-col gap-4 mt-2 text-[14px]">
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
      </Card>
    </div>
  );
};
