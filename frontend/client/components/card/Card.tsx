"use client";

import type { ReactNode } from "react";
import { CardContent, Card as Root } from "@/ui/card";

interface CardProps {
  children: ReactNode;
  className?: string;
  rootClassName?: string;
}

export const Card = ({ children, className, rootClassName }: CardProps) => {
  return (
    <Root className={`${rootClassName} p-0`}>
      <CardContent className={className}>{children}</CardContent>
    </Root>
  );
};
