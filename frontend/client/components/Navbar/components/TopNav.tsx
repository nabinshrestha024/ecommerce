import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson, IoSearch } from "react-icons/io5";

export const TopNav = () => {
  return (
    <div className="flex justify-between px-10 items-center py-5 border-b">
      <div className="flex gap-2 divide-x-2">
        <Image src={"/logo.png"} alt="Logo" height={80} width={200} />
        <div className="flex items-center gap-2">
          <FaLocationDot className="text-2xl" />
          <div>
            <div className="text-xs">Deliver to</div>
            <div className="text-sm font-semibold">Your Address</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <Input
            type={"text"}
            placeholder="What you're looking for"
            className="bg-[#EAF8E7] shrink-0 w-[500px] h-12 rounded-3xl pr-25"
          />
          <Button
            variant={"ghost"}
            className="bg-white rounded-3xl absolute right-2 top-1/2 -translate-y-1/2"
          >
            <IoSearch />
            Search
          </Button>
        </div>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <div className="flex gap-2 shrink-0 items-center text-xl">
          <FaShoppingCart />
          <div className="text-sm font-semibold">Cart</div>
        </div>
      </div>
    </div>
  );
};
