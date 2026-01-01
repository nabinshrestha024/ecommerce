import { useUser } from "@/hooks/user/useUser";
import { Card } from "../Card/Card";
import { BsThreeDotsVertical } from "react-icons/bs";

export const CustomerDetails = () => {
  const user = useUser(1);
  return (
    <div className="w-full max-w-[270px] flex flex-col gap-5">
      <Card
        className="w-full flex flex-col p-4 border border-[#E5E7EB] rounded-lg "
        cardClassName="p-0 border-none"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-[18px] leading-6 font-bold ">Total Customer</div>
          <BsThreeDotsVertical className="text-[#6A717F] text-[16px]" />
        </div>
        <div className="flex gap-2 mb-2 items-end">
          <div className="text-[32px] leading-8 font-bold ">
            {user.data?.totalCount}
          </div>
        </div>
        <div className="text-[14px] leading-normal font-normal ">
          Last 7 days
        </div>
      </Card>

      <Card
        className="w-full flex flex-col p-4 border border-[#e5e7eb] rounded-lg "
        cardClassName="p-0 border-none"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-[18px] leading-6 font-bold ">New Customer</div>
          <BsThreeDotsVertical className="text-[#6A717F] text-[16px]" />
        </div>
        <div className="flex gap-2 mb-2 items-end">
          <div className="text-[32px] leading-8 font-bold ">
            {user.data?.totalCount}
          </div>
        </div>
        <div className="text-[14px] leading-normal font-normal ">
          Last 7 days
        </div>
      </Card>

      <Card
        className="w-full flex flex-col p-4 border border-[#e5e7eb] rounded-lg "
        cardClassName="p-0 border-none"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-[18px] leading-6 font-bold ">Visitor</div>
          <BsThreeDotsVertical className="text-[#6A717F] text-[16px]" />
        </div>
        <div className="flex  gap-2 mb-2 items-end">
          <div className="text-[32px] leading-8 font-bold ">
            {user.data?.totalCount}
          </div>
        </div>
        <div className="text-[14px] leading-normal font-normal ">
          Last 7 days
        </div>
      </Card>
    </div>
  );
};
