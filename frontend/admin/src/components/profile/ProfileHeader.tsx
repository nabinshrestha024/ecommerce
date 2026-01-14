import { GoTag } from "react-icons/go";

export const ProfileHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm mx-5 mt-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GoTag className="text-[#4EA674]" />
          User Profile
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal details and preferences in one place
        </p>
      </div>
    </div>
  );
};
