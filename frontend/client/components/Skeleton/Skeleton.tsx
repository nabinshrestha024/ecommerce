"use client";

import { Skeleton as Root } from "@/ui/skeleton";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <Root className={`${className}`}></Root>;
};
