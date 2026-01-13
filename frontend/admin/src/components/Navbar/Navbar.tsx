import { useLocation } from "react-router-dom";
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
                              : pathname === "/vendor"
                                ? "Vendor"
                                : "";

  return (
    <nav className=" border-b h-16 flex items-center justify-between px-2 w-full">
      <h1 className="font-bold text-2xl">{heading}</h1>
      <div className="flex items-center gap-2">
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
