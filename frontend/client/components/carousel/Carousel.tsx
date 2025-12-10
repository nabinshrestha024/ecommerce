"use client";

import type { ReactNode } from "react";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel"
import { Carousel as Root} from "@/ui/carousel"
import { Card } from "../card/Card";
import { CardContent } from "@/ui/card";

interface CarouselProps {
  contentClassName?: string;
  items: ReactNode[];
  rootClassName?: string;
  previousClassName?: string;
  nextClassName?: string;
}

export const Carousel = ({
  contentClassName,
  items,
  rootClassName,
  previousClassName,
  nextClassName
}: CarouselProps) => {
  return (
    <Root className={rootClassName}>
      <CarouselContent className={contentClassName}>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className={contentClassName}>
                  {item}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={previousClassName}/>
      <CarouselNext className={nextClassName}/>
    </Root>
  );
};