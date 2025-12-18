import { Card } from "../Card/Card";
import { CirclePlus, Link } from "lucide-react";
import { Copy } from "lucide-react";
export const ShortProfile = () => {
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
              src="profile.webp"
              alt="Profile"
              className="h-full w-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <div className="font font-bold text-xl sm:text-[22px]">
            Wade Warren
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-[16px] text-gray-400 text-center break-all px-2 sm:px-0">
            <span className="break-all">wade.warren@example.com</span>
            <Copy
              className="h-4 w-4 cursor-pointer hover:text-gray-600 transition-colors shrink-0"
              onClick={() =>
                navigator.clipboard.writeText("wade.warren@example.com")
              }
            />
          </div>
          <div className="flex justify-center items-center flex-col mt-4 sm:mt-5 text-xs sm:text-[14px]">
            Linked with Social Media
            <div className="flex flex-wrap justify-center items-center gap-2 mt-3 w-full max-w-md">
              <button className="flex flex-row text-[#6467F2] items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 min-w-[140px] justify-center">
                <img
                  src="profile/icons8-google.svg"
                  className="h-5 w-5 object-cover"
                />
                <div className="text-sm flex flex-row items-center gap-2">
                  <Link className="h-4 w-4" />
                  Linked
                </div>
              </button>
              <button className="flex flex-row items-center text-[#6467F2] gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 min-w-[140px] justify-center">
                <img
                  src="profile/icons8-facebook.svg"
                  className="h-6 w-5 object-cover"
                />
                <div className="text-sm flex flex-row items-center gap-2">
                  <Link className="h-4 w-4" />
                  Linked
                </div>
              </button>
              <button className="flex flex-row text-[#6467F2] items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 min-w-[140px] justify-center">
                <img
                  src="profile/icons8-x.svg"
                  className="h-5 w-5 object-cover"
                />
                <div className="text-sm flex flex-row items-center gap-2">
                  <Link className="h-4 w-4" />
                  Linked
                </div>
              </button>
            </div>
            <button className="flex justify-center items-center rounded-md border gap-3 px-3 py-2 mt-2 border-[#E5E7EB] hover:bg-gray-50 w-full sm:w-auto">
              <CirclePlus size={16} />
              Social Media
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
