import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useGetProfile } from "@/hooks/profile/useGetProfile";

export const Navbar = () => {
  const { pathname } = useLocation();
  const { data } = useGetProfile();
  const heading =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname === "/order-management"
        ? "Order Management"
        : pathname === "/customer"
          ? "Customer"
          : pathname === "/category"
            ? "Category"
            : pathname === "/product"
              ? "Product"
              : pathname === "/product-management"
                ? "Product Management"
                : pathname === "/attribute-management"
                  ? "Attribute Management"
                  : pathname === "/discount"
                    ? "Discount"
                    : pathname === "/transaction"
                      ? "Transaction"
                      : pathname === "/profile"
                        ? "Profile"
                        : pathname === "/tag-management"
                          ? "Tag Management"
                          : pathname === "/product-reviews"
                            ? "Product Reviews"
                            : pathname === "/website-reviews"
                              ? "Website Reviews"
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
        <div
          className=" h-10 w-10 flex items-center justify-center text-2xl bg-(--bg) text-(--text)"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
        </div>

        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src={data?.profileImageUrl}
            alt="User"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};
