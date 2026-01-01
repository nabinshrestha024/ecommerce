import {
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  Dialog as Root,
} from "@/ui/dialog";
import type { ReactNode } from "react";

interface DialogProps {
  children: ReactNode;
  className?: string;
  triggerContent: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dialog = ({
  children,
  className,
  triggerContent,
  open,
  onOpenChange,
}: DialogProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogOverlay className="bg-transparent backdrop-blur-sm" />

      <DialogContent className={className}>{children}</DialogContent>
    </Root>
  );
};
