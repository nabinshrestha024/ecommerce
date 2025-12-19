import Image from "next/image";
import { SecondCardContent } from "../constants/SecondCardContent";
import { Card } from "@/components/Card/Card";
export const SecondCard = () => {
  return (
    <Card
      rootClassName="p-0 shadow-none border-none"
      className="p-4 pb-6 h-full border shadow-lg w-full lg:w-auto rounded-2xl bg-white"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Gaming accessories
        </h2>
        <div className="grid grid-cols-2 gap-4 px-2">
          {SecondCardContent.map((ad, index) => (
            <div
              key={ad.id}
              className="overflow-hidden flex items-center justify-center  rounded-lg shadow-md  hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative h-25 w-[81px] ">
                <Image
                  src={ad.src}
                  alt={ad.alt}
                  fill
                  className="max-w-full  object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
