import { CardContent, Card as Root } from "@/ui/card";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  cardClassName?: string;
}

export const Card = ({ children, cardClassName, className }: CardProps) => {
  return (
    <Root className={cardClassName}>
      <CardContent className={className}>{children}</CardContent>
    </Root>
  );
};
