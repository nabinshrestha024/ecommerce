"use client";

import type { ReactNode } from "react";
import {
  DialogContent,
  DialogTrigger,
  Dialog as Root,
} from "@/ui/dialog";

interface DialogProps {
  contentClassName?: string;
  children: ReactNode;
  triggerText: ReactNode;
  triggerClassName?: string;
}

export const Dialog = ({
  contentClassName,
  children,
  triggerText,
  triggerClassName,
}: DialogProps) => {
  return (
    <Root>
      <DialogTrigger className={triggerClassName}>{triggerText}</DialogTrigger>
      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Root>
  );
};