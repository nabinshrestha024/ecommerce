import { Card } from "@/components/Card/Card";
import { Skeleton } from "@/components/Skeleton/Skeleton";

export const ReviewSkeleton = () => {
  return (
    <Card
      className="p-3 border-0 shadow-none  w-full"
      rootClassName="py-0 border shadow-xl"
    >
      <div className="animate-pulse flex flex-col gap-3 w-full">
        <div className="flex gap-3">
          <Skeleton className="h-[50px] bg-gray-200 rounded-full w-[50px] shrink-0" />
          <div className="flex flex-col gap-2 w-[200px]">
            <Skeleton className="h-5 bg-gray-200 rounded-sm w-full" />
            <Skeleton className="h-5 bg-gray-200 rounded-sm w-full" />
          </div>
        </div>
        <Skeleton className="h-5 bg-gray-200 rounded w-full" />
      </div>
    </Card>
  );
};
