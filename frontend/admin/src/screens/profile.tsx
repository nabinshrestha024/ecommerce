import { ChangePassword } from "@/components/profile/ChangePassword";
import { ProfileUpdate } from "@/components/profile/ProfileUpdate";
import { ShortProfile } from "@/components/profile/ShortProfile";

export const Profile = () => {
  return (
    <div className="px-4 lg:px-5 pt-5 pb-8 w-full">
      <div className="font-bold text-[22px] leading-[100%] tracking-[0.5%] shrink-0">
        About Section
      </div>
      <div className="pl-0 pr-0 grid grid-cols-1 lg:grid-cols-[40%_60%] mt-8 gap-5 lg:pr-3 lg:pl-5">
        <div className="flex flex-col gap-4">
          <ShortProfile />
          <ChangePassword />
        </div>
        <ProfileUpdate />
      </div>
    </div>
  );
};
