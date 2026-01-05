import { Card } from "@/components/Card/Card";
import { Skeleton } from "@/components/Skeleton/Skeleton";

export const ProductCardSkeleton = () => {
  return (
    <Card
      className="p-3 w-full border-0 shadow-none max-w-full"
      rootClassName="py-0 border shadow-xl"
    >
      <div className="animate-pulse flex flex-col gap-3 w-full">
        <Skeleton className={`h-[185px] bg-gray-200 rounded-[12px] w-full`} />
        <Skeleton className="h-5 bg-gray-200 rounded w-3/4" />
        <Skeleton className="h-4 bg-gray-200 rounded w-full" />
        <Skeleton className="h-4 bg-gray-200 rounded w-1/2" />
        <Skeleton className="h-6 bg-gray-200 rounded w-1/3" />
        <Skeleton className="h-10 bg-gray-200 rounded-full mt-2" />
      </div>
    </Card>
  );
};
