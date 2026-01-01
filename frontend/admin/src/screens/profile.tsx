import { ChangePassword } from "@/components/Profile/ChangePassword";
import { ProfileUpdate } from "@/components/Profile/ProfileUpdate";
import { ShortProfile } from "@/components/Profile/ShortProfile";
import { Tabs } from "@/components/Tabs/Tabs";
import { useQueryState } from "nuqs";

export const Profile = () => {
  const tabsData = [
    {
      id: 1,
      value: "editProfile",
      triggerText: "Edit Profile",
      content: <ProfileUpdate />,
    },
    {
      id: 2,
      value: "changePassword",
      triggerText: "Change Password",
      content: <ChangePassword />,
    },
  ];

  const [page, setPage] = useQueryState("page", {
    defaultValue: "editProfile",
  });

  return (
    <div className="px-4 lg:px-5 pt-5 pb-8 w-full space-y-5">
      <div className="font-bold text-[22px] leading-[100%] tracking-[0.5%] shrink-0">
        About Section
      </div>
      <ShortProfile />
      <Tabs
        data={tabsData}
        defaultValue={page}
        tabsListClassName=" w-full bg-[#EAF8E7]"
        setPage={setPage}
      ></Tabs>
    </div>
  );
};
