import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className="bg-[#EAF8E7] hidden md:block">
      <div className="w-full flex justify-around flex-col items-center lg:flex-row px-10 gap-5 border-b py-5">
        <div className="flex items-center ">
          <Image src={"/logo.png"} alt="Logo" height={80} width={180} />
        </div>
        <div className="relative flex ">
          <Input
            type={"text"}
            placeholder="Enter your email address"
            className="shrink-0 w-[480px] h-12 rounded-3xl pr-25 hover:cursor-pointer"
          />
          <Button
            variant={"ghost"}
            className="bg-white rounded-3xl absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer"
          >
            Subscribe
          </Button>
        </div>

        <div>
          <div>Connect With Us</div>
          <div className="flex gap-2 text-2xl">
            <FaFacebook className="text-blue-500 text-2xl" />
            <FaInstagram className="text-white bg-[linear-gradient(to_right,#feda77,#fa7e1e,#d62976,#962fbf,#4f5bd5)] text-2xl rounded-md" />
            <FaXTwitter className="text-2xl" />
            <FaLinkedin className="text-blue-700 text-2xl" />
          </div>
        </div>
      </div>

      <div className="py-5 flex justify-center text-gray-500">
        © {new Date().getFullYear()} TapaikoBazar. All rights reserved
      </div>
    </div>
  );
};
