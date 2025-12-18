import { Card } from "@/components/card/Card";
import Image from "next/image";
import Link from "next/link";
export const FirstCard = () => {
  return (
    <Card
      rootClassName="p-0 shadow-none border-none"
      className="pt-2 h-full pb-5 border shadow-[0px_1px_3px_0px_#00000033] w-full rounded-xl"
    >
      <div className="flex flex-col justify-center items-center gap-2 pt-2">
        <div>
          <h2 className="text-2xl font-bold mb-2">New Year! New Fashion</h2>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="relative w-60 h-56">
            <Image
              src="/advertisement/newyear.png"
              alt="Fashion models wearing trendy New Year collection clothing against a festive background with celebratory decorations and New Year! New Fashion promotional text"
              className="object-cover rounded-md"
              fill
            />
          </div>
          <Link href="/product">
            <button className="mt-4 bg-[#EAF8E7] absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%] text-[#023337] px-3 py-2 rounded-2xl cursor-pointer">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
