"use client";
import {
  Sidebar as Root,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/ui/sidebar";
import { NavRoutes } from "./NavRoutes";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <>
      <Root side="right" variant="floating" className="z-50 relative">
        <SidebarHeader>
          <div className="flex justify-center">
            <Image
              src={"/logo.png"}
              alt="Logo"
              height={80}
              width={120}
              className="lg:hidden"
            />
          </div>
        </SidebarHeader>
        <NavRoutes />
      </Root>

      <SidebarTrigger />
    </>
  );
};
