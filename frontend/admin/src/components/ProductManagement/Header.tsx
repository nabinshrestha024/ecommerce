import { GoTag } from "react-icons/go";

export const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GoTag className="text-[#4EA674]" />
          Product Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage, organize, and publish your products efficiently.
        </p>
      </div>
    </div>
  );
};
