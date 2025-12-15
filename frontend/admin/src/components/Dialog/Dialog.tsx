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
}

export const Dialog = ({
  children,
  className,
  triggerContent,
}: DialogProps) => {
  return (
    <Root>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogOverlay className="bg-transparent backdrop-blur-sm" />

      <DialogContent className={className}>{children}</DialogContent>
    </Root>
  );
};
