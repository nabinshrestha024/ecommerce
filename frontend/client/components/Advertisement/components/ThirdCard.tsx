import Image from "next/image";
import Link from "next/link";

const advertisements = [
  { src: "/advertisement/bethewinner.png", alt: "Advertisement 3" },
  { src: "/advertisement/redmi.png", alt: "Advertisement 4" },
];

export const ThirdCard = () => {
  return (
    <div className="h-[305px]">
      <div className="grid grid-cols-2 gap-4">
        {advertisements.map((ad, index) => (
          <div
            key={index}
            className="flex justify-center items-center rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              href={`/product?categoryId=1`}
              className="relative w-[188px] h-[146px] overflow-hidden rounded-xl"
            >
              <Image
                src={ad.src}
                alt={ad.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center ">
        <div className="flex flex-row justify-between items-center rounded-xl w-full shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <Link
            href={`/product?categoryId=1`}
            className="relative w-[221px] h-[163px]"
          >
            <Image
              src="/advertisement/tb.png"
              alt="Advertisement 5"
              fill
              className="object-cover cursor-pointer"
            />
          </Link>
          <div className="flex flex-col justify-center px-4 py-3">
            <h3 className="font-semibold text-md text-gray-800">
              Phillips 4k Smart TV
            </h3>
            <p className="text-xl font-bold text-blue-600 mt-1">Rs. 35,999</p>
            <Link href={`/product?categoryId=1`}>
              <button className="mt-3 bg-[#EAF8E7] text-black text-[14px] px-8 py-1 rounded-2xl font-bold hover:bg-[#d4f0cf] transition-colors duration-200 cursor-pointer">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
