import { Notification } from "@/components/Notification/Notification";
import { User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IoLogOut, IoReorderThreeOutline } from "react-icons/io5";
import { CartComponent } from "./CartComponent";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/ui/button";
import { ConfirmationDialog } from "@/components/ConfirmationDialog/ConfirmationDialog";
import { IoMdExit } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { FaUserLarge } from "react-icons/fa6";
import { DropDown } from "@/components/DropDown/DropDown";

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

export const Sidebar = () => {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { token, logout } = useAuth();
  const isAuth = Boolean(token);
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3">
      {isAuth && <Notification />}
      <CartComponent />
      {isAuth ? (
        <DropDown
          open={profileOpen}
          onOpenChange={setProfileOpen}
          side="bottom"
          align="end"
          sideOffset={15}
          alignOffset={-10}
          trigger={<FaUserLarge size={19} />}
        >
          <div className="w-[150px] flex flex-col gap-2">
            <div
              className="text-sm px-2 py-1 border-b cursor-pointer"
              onClick={() => {
                setProfileOpen(false);
                router.push("/profile");
              }}
            >
              My Profile
            </div>

            <ConfirmationDialog
              trigger={
                <button className="flex items-center gap-2 text-sm rounded px-2 py-1 cursor-pointer">
                  <IoLogOut size={16} />
                  Logout
                </button>
              }
              confirmFunc={logout}
              description="Are you sure you want to logout?"
            />
          </div>
        </DropDown>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
      <IoReorderThreeOutline
        className="text-2xl"
        onClick={() => setOpen(true)}
      />
      <div
        className={`h-screen w-screen bg-black/30 z-9 fixed top-0 left-0 ${open ? "" : "hidden"}`}
        onClick={() => setOpen(false)}
      ></div>
      <div
        className={`p-4 border shadow-lg fixed ${open ? "translate-x-0" : "translate-x-[50vw]"} right-0 w-[50vw] top-0 h-screen bg-white z-10 transition ease-in-out duration-500`}
      >
        <div
          onClick={() => setOpen(false)}
          className="flex gap-2 items-center justify-between"
        >
          <div className="text-lg font-semibold">Navbar</div>
          <X size={20} />
        </div>
        <div className="flex flex-col gap-5 pt-5">
          {data.map((val, index) => {
            const isActive = pathname.startsWith(val.url);
            return (
              <div key={index}>
                <Link
                  href={val.url}
                  className="relative"
                  onClick={() => setOpen(false)}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
