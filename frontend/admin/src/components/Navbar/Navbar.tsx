import { Input } from "@/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useDebounce } from "@/hooks/search/useDebounce";
import { useSearchs } from "@/hooks/search/useSearch";
import { useGetProfile } from "@/hooks/profile/useGetProfile";

export const Navbar = () => {
  const [searchData, setSearchData] = useState("");
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

  const debounceSearch = useDebounce(searchData, 500);

  useEffect(() => {
    if (!debounceSearch) return;
  }, [debounceSearch]);

  const search = useSearchs(debounceSearch);
  const navigate = useNavigate();
  return (
    <nav className=" border-b h-16 flex items-center justify-between px-2 w-full">
      <h1 className="font-bold text-2xl">{heading}</h1>
      <div className="flex items-center gap-2">
        {/* <div className="relative w-80">
          <Input
            type="text"
            value={searchData}
            placeholder="Search data, users, or reports"
            className="pr-10"
            onChange={(e) => setSearchData(e.target.value)}
          />

          {debounceSearch && (
            <div className="absolute top-14 left-0 w-full bg-white shadow-lg  z-50 max-h-80 overflow-y-auto ">
              {search.isLoading && (
                <div className="p-4 text-sm text-gray-500">Searching...</div>
              )}

              {search.isError && (
                <div className="p-4 text-sm text-red-500">
                  Failed to fetch products
                </div>
              )}

              {search.data?.items.map((product) => (
                <div
                  key={product.productId}
                  onClick={() => {
                    navigate(`/product/id/${product.slug}`);
                    setSearchData("");
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-[#EAF8E7] cursor-pointer"
                >
                  <div className="w-10 h-10 relative rounded overflow-hidden">
                    <img
                      src={product.primaryImageUrl}
                      alt={product.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium">{product.name}</div>
                </div>
              ))}
            </div>
          )}
        </div> */}
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
