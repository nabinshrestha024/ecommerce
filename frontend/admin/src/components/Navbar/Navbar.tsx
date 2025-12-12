import { FaRegBell } from "react-icons/fa";
import { Input } from "@/ui/input";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/ui/button";

export const Navbar = () => {
  const { pathname } = useLocation();
  const heading =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname === "/order-management"
        ? "Order Management"
        : pathname === "/customer"
          ? "Customer"
          : pathname === "/category"
            ? "Category"
            : pathname === "/product-management"
              ? "Product Management"
              : pathname === "/transaction"
                ? "Transaction"
                : pathname === "/profile"
                  ? "Profile"
                  : "";

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <nav className=" border-b h-16 flex items-center justify-between px-2 w-full">
      <h1 className="font-bold text-2xl">{heading}</h1>
      <div className="flex items-center gap-2">
        <div className="relative w-80">
          <Input
            type="text"
            placeholder="Search data, users, or reports"
            className="pr-10"
          />
        </div>

        <div className="p-2 hover:bg-gray-100 rounded-full relative">
          <FaRegBell className="text-xl text-gray-600" />
          <div className="absolute w-2 h-2 bg-red-500 rounded-full top-[9px] right-[9px]"></div>
        </div>
        <Button onClick={() => setDarkMode(!darkMode)}>Dark mode</Button>

        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src="/profile.webp"
            alt="User"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};
