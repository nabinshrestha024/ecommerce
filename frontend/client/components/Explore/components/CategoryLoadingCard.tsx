import { Card } from "@/components/card/Card";
import { Skeleton } from "@/components/Skeleton/Skeleton";

export const CategoryCardSkeleton = () => {
  return (
    <Card
      className="p-3 border-0 shadow-none  w-full"
      rootClassName="py-0 border shadow-xl"
    >
      <div className="animate-pulse flex flex-col gap-3 w-full">
        <Skeleton className="w-full h-[185px] bg-gray-200 rounded-[12px]" />
        <Skeleton className="h-5 bg-gray-200 rounded w-3/4" />
      </div>
    </Card>
  );
};
