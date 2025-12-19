"use client";

import { useSidebar } from "@/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = [
  {
    title: "Home",
    url: "/home",
  },
  {
    title: "Product",
    url: "/product",
  },
  {
    title: "About Us",
    url: "/about-us",
  },
  {
    title: "Contact",
    url: "/contact",
  },
];

export const NavRoutes = () => {
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center items-center py-5 border-b">
      {data.map((val) => {
        const isActive = pathname.startsWith(val.url);

        return (
          <Link
            href={val.url}
            key={val.title}
            className={`font-semibold relative transition-colors duration-300 ${
              isActive ? "text-green-700" : ""
            }`}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
          >
            {val.title}

            <span
              className={`
            absolute left-1/2 -translate-x-1/2 -bottom-1.5
            h-[3px] w-[75%] rounded-xl bg-green-700
            transition-all duration-300 ease-out
            ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
          `}
            />
          </Link>
        );
      })}
    </div>
  );
};
