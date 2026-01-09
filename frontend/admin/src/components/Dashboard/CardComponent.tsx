import { Card } from "../Card/Card";
import type { ReactNode } from "react";

interface CardComponentProps {
  title: string;
  children: ReactNode;
}

export const CardComponent = ({ title, children }: CardComponentProps) => {
  return (
    <Card className="p-2.5 lg:p-5 w-full" cardClassName="p-0 w-full">
      <div>
        <div className="flex justify-between items-center">
          <div className="text-[18px] font-bold font-sans">{title}</div>
        </div>
        {children}
      </div>
    </Card>
  );
};
