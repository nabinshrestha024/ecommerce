import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import type { ReactNode } from "react";

interface DropDownProp {
  children: ReactNode;
  className?: string;
  trigger?: ReactNode;
  triggerClassName?: string;
  sideOffset?: number;
  alignOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}
interface DropDownProp {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
  trigger?: ReactNode;
  triggerClassName?: string;
  sideOffset?: number;
  alignOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}
export const DropDown = ({
  open,
  onOpenChange,
  children,
  className,
  trigger,
  triggerClassName,
  sideOffset,
  alignOffset,
  side = "bottom",
  align = "center",
}: DropDownProp) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild className={triggerClassName}>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={className}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
