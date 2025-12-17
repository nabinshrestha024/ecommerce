import Image from "next/image";
import Link from "next/link";

export const ThirdCard = () => {
  return (
    <div className="h-full pt-2">
      <div className="grid grid-cols-2 h-auto gap-4 px-4 pt-2">
        <div className="flex justify-center items-center rounded-2xl shadow-[0px_1px_3px_0px_#00000033]">
          <Image
            src="/advertisement/bethewinner.png"
            alt="Advertisement 3"
            width={220}
            height={180}
            className="w-full h-full object-contain rounded-xl hover:cursor-pointer"
          />
        </div>
        <div className="flex justify-center items-center rounded-2xl shadow-[0px_1px_3px_0px_#00000033]">
          <Image
            src="/advertisement/redmi.png"
            alt="Advertisement 4"
            width={220}
            height={180}
            className="w-full h-full object-contain rounded-xl hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center rounded-2xl px-3  ">
        <div className="flex flex-row justify-between items-center border-none rounded-xl mt-4 w-full shadow-[0px_1px_3px_0px_#00000033]">
          <Image
            src="/advertisement/tb.png"
            alt="Advertisement 5"
            width={220}
            height={180}
            className="w-40 h-32 object-contain rounded-xl hover:cursor-pointer"
          />
          <div className="flex flex-col justify-center px-4">
            <div className="font-semibold text-lg">Phillips 4k Smart TV</div>
            <div className="text-xl font-bold text-blue-600">$499.99</div>
            <Link href="/productDetails">
              <button className="flex justify-center mt-1 mb-1 bg-[#EAF8E7] text-[#023337] px-2 py-0.5 rounded-2xl w-max hover:cursor-pointer">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
