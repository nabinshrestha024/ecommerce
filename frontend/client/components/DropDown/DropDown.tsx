import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import type { ReactNode } from "react";

interface DropDownProp {
  children: ReactNode;
  className: string;
  trigger?: ReactNode;
  triggerClassName?: string;
}

export const DropDown = ({
  children,
  className,
  trigger,
  triggerClassName,
}: DropDownProp) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={triggerClassName}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
