"use client";

import type { ReactNode } from "react";
import { Dialog as Root, DialogContent, DialogTrigger } from "@/ui/dialog";

interface DialogProps {
  contentClassName?: string;
  children: ReactNode;
  triggerText: ReactNode;
  triggerClassName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Dialog = ({
  contentClassName,
  children,
  triggerText,
  triggerClassName,
  open,
  onOpenChange,
}: DialogProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={triggerClassName}>{triggerText}</DialogTrigger>
      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Root>
  );
};
