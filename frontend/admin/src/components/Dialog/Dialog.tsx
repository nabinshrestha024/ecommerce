import { DialogContent, DialogTrigger, Dialog as Root } from "@/ui/dialog";
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
      <DialogTrigger>{triggerContent}</DialogTrigger>
      <DialogContent className={className}>{children}</DialogContent>
    </Root>
  );
};
