import { useState } from "react";
import { Card } from "../Card/Card";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CustomerChart } from "./CustomerChart";
import { CustomerLastWeekChart } from "./CustomerlastWeekChart";
export const CustomerOverviewChart = () => {
  const [weeklyDetails, setWeeklyDetails] = useState("This week");
  return (
    <Card
      className="w-full flex flex-col p-5 rounded-lg "
      cardClassName="p-0 w-full border border-[#E5E7EB]"
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="text-[18px] leading-6 font-bold text-[#23272E]">
            Customer Overview
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-full max-w-[178px] flex justify-around items-center rounded-xl p-1 bg-[#EAF8E7] ">
              <button
                onClick={() => setWeeklyDetails("This week")}
                className={` px-2 py-3 text-[14px] leading-3 bg-[#EAF8E7] ${
                  weeklyDetails === "This week"
                    ? "bg-white text-[#4EA674] font-medium rounded-lg "
                    : "bg-transparent text-[#6A717F]"
                }`}
              >
                This week
              </button>
              <button
                onClick={() => setWeeklyDetails("Last week")}
                className={` px-2 py-3 text-[14px] leading-3 bg-[#EAF8E7] ${
                  weeklyDetails === "Last week"
                    ? "bg-white text-[#4EA674] font-medium rounded-lg "
                    : "bg-transparent text-[#6A717F]"
                }`}
              >
                Last week
              </button>
            </div>
            <BsThreeDotsVertical className="text-[#6A717F] text-[20px]" />
          </div>
        </div>
        {weeklyDetails === "This week" ? (
          <CustomerChart />
        ) : (
          <CustomerLastWeekChart />
        )}
      </div>
    </Card>
  );
};
