import { Card } from "@/components/card/Card";
import Image from "next/image";
import Link from "next/link";

export const FirstCard = () => {
  return (
    <Card
      rootClassName="p-0 shadow-none border-none"
      className="pt-2 h-full pb-5 border shadow-[0px_1px_3px_0px_#00000033] w-full rounded-xl"
    >
      <div className="flex flex-col items-center gap-3 pt-2">
        <h2 className="text-2xl font-bold">New Year! New Fashion</h2>

        <div className="relative flex justify-center w-full">
          <div className="relative w-90 h-56">
            <Image
              src="/advertisement/newyear.png"
              alt="New Year fashion collection"
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>

          <Link
            href={`/product?categoryId=17`}
            className="absolute bottom-1 translate-y-1/2 
                       bg-[#EAF8E7] text-black 
                       px-8 py-1  rounded-2xl text-[14px] font-bold
                       hover:bg-[#dff3db] transition "
          >
            Shop Now
          </Link>
        </div>
      </div>
    </Card>
  );
};
