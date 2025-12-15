import { BsThreeDotsVertical } from "react-icons/bs";
import { Card } from "../Card/Card";
import { Button } from "@/ui/button";
import type { ReactNode } from "react";

interface CardComponentProps {
  title: string;
  children: ReactNode;
}

export const CardComponent = ({ title, children }: CardComponentProps) => {
  return (
    <Card className="p-5 w-full" cardClassName="p-0 w-full">
      <div>
        <div className="flex justify-between">
          <div className="text-lg font-semibold">{title}</div>
          <div>
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="text-xs text-gray-500">Last 7 days</div>
        {children}
        <div className="flex justify-end mt-3">
          <Button
            variant={"ghost"}
            className="border border-blue-500 rounded-3xl px-7 text-blue-500"
          >
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
