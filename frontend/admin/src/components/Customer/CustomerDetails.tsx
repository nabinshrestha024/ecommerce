import { useUser } from "@/hooks/user/useUser";
import { Card } from "../Card/Card";

export const CustomerDetails = () => {
  const user = useUser(1);
  return (
    <div className="w-full max-w-[270px] flex flex-col gap-5">
      <Card
        className="w-full flex flex-col gap-4 p-4 border border-[#E5E7EB] rounded-lg "
        cardClassName="p-0 border-none"
      >
        <div className="text-[18px] leading-6 font-bold text-[#23272E]">
          Total Customer
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="text-[32px] leading-8 font-bold text-[#023337]">
            {user.data?.totalCount}
          </div>

          <div className="text-[14px] leading-normal font-normal text-[#6A717F]">
            Last 7 days
          </div>
        </div>
      </Card>

      <Card
        className="w-full flex flex-col gap-4 p-4 border border-[#e5e7eb] rounded-lg "
        cardClassName="p-0 border-none"
      >
        <div className="text-[18px] leading-6 font-bold text-[#23272E] ">
          New Customer
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="text-[32px] leading-8 font-bold text-[#023337]">
            {user.data?.totalCount}
          </div>

          <div className="text-[14px] leading-normal font-normal text-[#6A717F]">
            Last 7 days
          </div>
        </div>
      </Card>

      <Card
        className="w-full flex flex-col gap-4 p-4 border border-[#e5e7eb] rounded-lg "
        cardClassName="p-0 border-none"
      >
        <div className="text-[18px] leading-6 font-bold text-[#23272E]">
          Visitor
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="text-[32px] leading-8 font-bold text-[#023337] ">
            {user.data?.totalCount}
          </div>

          <div className="text-[14px] leading-normal font-normal text-[#6A717F]">
            Last 7 days
          </div>
        </div>
      </Card>
    </div>
  );
};
