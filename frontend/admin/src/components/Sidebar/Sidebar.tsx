import { IoMdHome, IoMdPerson } from "react-icons/io";
import { FaProductHunt, FaShoppingCart, FaStar, FaTags } from "react-icons/fa";
import { BsPlusCircleFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { AiOutlinePercentage } from "react-icons/ai";
import {
  Sidebar as Root,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { TooltipContent, Tooltip, TooltipTrigger } from "@/ui/tooltip";
import { LogoutButton } from "../Logout/LogoutButton";
import { useGetProfile } from "@/hooks/profile/useGetProfile";

const items = [
  {
    group: "Main Menu",
    data: [
      { title: "Dashboard", url: "/dashboard", icon: IoMdHome },
      {
        title: "Order Management",
        url: "/order-management",
        icon: FaShoppingCart,
      },
      { title: "Customer", url: "/customer", icon: IoMdPerson },
      { title: "Product", url: "/product", icon: FaProductHunt },
      { title: "Category", url: "/category", icon: BiCategory },
      { title: "Website Review", url: "/website-reviews", icon: FaStar },
    ],
  },
  {
    group: "Product",
    data: [
      {
        title: "Product Management",
        url: "/product-management",
        icon: BsPlusCircleFill,
      },

      {
        title: "Attribute Management",
        url: "/attribute-management",
        icon: BsPlusCircleFill,
      },
      {
        title: "Discount",
        url: "/discount",
        icon: AiOutlinePercentage,
      },
      {
        title: "Tag Management",
        url: "/tag-management",
        icon: FaTags,
      },
      {
        title: "Product Review",
        url: "/product-reviews",
        icon: FaStar,
      },
    ],
  },
  {
    group: "User",
    data: [{ title: "User Profile", url: "/profile", icon: CgProfile }],
  },
  {
    group: "Vendor",
    data: [{ title: "Vendor", url: "/vendor", icon: CgProfile }],
  },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { data } = useGetProfile();

  return (
    <Root collapsible="icon" className="w-60">
      <div
        className={`w-full flex ${collapsed ? "justify-center" : "justify-between"} items-center px-4 pt-2`}
      >
        <div className={`${collapsed ? "hidden" : "block"} w-30 h-auto`}>
          <img src="/logo.png" className="h-full w-full object-cover" />
        </div>
        <SidebarTrigger
          onClick={() => setCollapsed(!collapsed)}
          size={"icon-lg"}
        />
      </div>
      <SidebarContent>
        {items.map((val) => (
          <SidebarGroup key={val.group}>
            <SidebarGroupLabel>{val.group}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {val.data.map((value) => {
                  const isActive = pathname === value.url;

                  return (
                    <SidebarMenuItem key={value.title}>
                      <SidebarMenuButton
                        className={`
                          flex items-center gap-3 rounded-md px-3 py-2
                          transition-all
                          ${isActive ? "bg-green-600 text-white hover:bg-green-500 hover:text-white" : "text-[#6A717F] hover:bg-gray-100 hover:text-[#6A717F]"}
                        `}
                      >
                        <Link
                          to={value.url}
                          className="flex items-center gap-3 w-full"
                        >
                          <Tooltip>
                            <TooltipTrigger>
                              <value.icon className="text-xl shrink-0" />
                            </TooltipTrigger>
                            <TooltipContent
                              className={`bg-foreground text-background ${collapsed ? "block" : "hidden"}`}
                            >
                              {value.title}
                            </TooltipContent>
                          </Tooltip>
                          <span>{value.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-300 py-5">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 overflow-hidden rounded-full shrink-0">
              <img
                src={data?.profileImageUrl}
                className="h-full w-full object-cover"
              />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <div className="text-sm font-semibold truncate">
                  {data?.fullName}
                </div>
                <div className="text-xs text-gray-500 line-clamp-1 break-all">
                  {data?.email}
                </div>
              </div>
            )}
          </div>

          {!collapsed && <LogoutButton />}
        </div>
      </SidebarFooter>
    </Root>
  );
};
