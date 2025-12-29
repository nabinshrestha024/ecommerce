"use client";

import type { ReactNode } from "react";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel";
import { Carousel as Root, type CarouselApi } from "@/ui/carousel";
import { Card } from "../Card/Card";
import { CardContent } from "@/ui/card";
import type { EmblaOptionsType } from "embla-carousel";

interface CarouselProps {
  contentClassName?: string;
  items: ReactNode[];
  rootClassName?: string;
  previousClassName?: string;
  nextClassName?: string;
  opts?: EmblaOptionsType;
  plugins?: any[];
  itemClassName?: string;
}

export const Carousel = ({
  contentClassName,
  items,
  rootClassName,
  previousClassName,
  nextClassName,
  opts,
  plugins,
  itemClassName,
}: CarouselProps) => {
  return (
    <Root className={rootClassName} opts={opts} plugins={plugins}>
      <CarouselContent className={contentClassName}>
        {items.map((item, index) => (
          <CarouselItem key={index} className={`p-0 ${itemClassName}`}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={previousClassName} />
      <CarouselNext className={nextClassName} />
    </Root>
  );
};
