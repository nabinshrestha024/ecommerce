import { Card } from "@/components/card/Card";
import { TrendData } from "./TrendData.import";
import Image from "next/image";
import { Button } from "@/ui/button";

export const Trennd = () => {
  return (
    <div>
      <Card
        className=" py-3 px-5 w-[392px] border-0 shadow-none "
        rootClassName="py-0 border shadow-xl"
      >
        <div className="flex flex-col gap-[15px]">
          <div className="text-[20px] font-medium text-[#000000]">
            Trend collection for men
          </div>
          <div className="grid grid-cols-2 gap-5">
            {TrendData.map((trendData) => (
              <div key={trendData.id} className="relative h-[159px] w-full">
                <Image
                  src={trendData.image}
                  alt="image"
                  fill
                  className="rounded-[10px] border border-[#E5E7EB] object-cover"
                />
                <Button className="absolute bottom-2 left-5  px-8 py-1 text-[14px] font-bold leading-3 bg-[#EAF8E7] text-black  rounded-[200px] hover:bg-[#EAF8E7]">
                  Buy Now
                </Button>
                {trendData.id == 1 ? (
                  <div className="absolute top-2 right-2 text-[#4EA674] text-[12px] font-bold"></div>
                ) : (
                  <div className="absolute top-2 right-2 text-[#4EA674] text-[12px] font-bold">
                    $25.95
                  </div>
                )}
                {trendData.id == 0 && (
                  <div className="absolute top-2 left-2 text-black text-[12px] font-normal">
                    20% off
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
