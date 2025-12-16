import { Card } from "@/components/card/Card";
import { TrendData } from "./TrendData.import";
import Image from "next/image";

export const Trennd = () => {
  return (
    <div>
      <Card className="w-full pt-3 px-5 pb-5 ">
        <div className="flex flex-col gap-[15px]">
          <div className="text-[22px] font-normal text-[#000000]">
            Trennd collection for men
          </div>
          <div className="grid grid-cols-2 gap-5">
            {TrendData.map((trendData) => (
              <div key={trendData.id} className="relative">
                <Image
                  src={trendData.image}
                  alt="image"
                  width={166}
                  height={171}
                  className="w-full rounded-[10px] border border-[#E5E7EB]"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
