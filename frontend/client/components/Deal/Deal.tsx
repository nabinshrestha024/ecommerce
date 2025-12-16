import { Button } from "@/ui/button";
import { deals } from "./deals.import";
import { Card } from "../card/Card";
import Image from "next/image";
import Link from "next/link";
import { IoIosHeartEmpty } from "react-icons/io";

export const Deal = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-xl">Limited-Time Deal</h1>
        <Button
          variant={"outline"}
          className="rounded-2xl border border-black text-xs"
        >
          View All
        </Button>
      </div>
      <div className="w-full flex items-center justify-start gap-5 mt-8">
        {deals.map((val) => (
          <Card key={val.id} className="p-2 overflow-x-auto max-w-[265px]">
            <div className="relative">
              <div className="w-[248px] h-[180px] relative rounded-2xl">
                <Image
                  src={val.image}
                  alt="Image"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg">{val.title}</h1>
                <h2 className="text-[14px] line-clamp-2">{val.desc}</h2>
                <p className="text-[12px] font-medium">({val.review}reviews)</p>
                <div className="flex gap-3">
                  <p className="text-[16px] text-green-600">{val.dealPrice}</p>
                  <p className="line-through text-gray-400">
                    ({val.actualPrice})
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href="/product"
                    className="text-blue-500 underline hover:cursor-pointer"
                  >
                    View Details
                  </Link>
                  <Button>Add to cart</Button>
                </div>
              </div>
              <div className="absolute p-1 bg-white rounded-full top-2 right-2">
                <IoIosHeartEmpty />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
