"use client";

import Autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";
import { Slides } from "./constants/Slides";
import Link from "next/link";
import { useFetchBanner } from "@/hooks/banner/useFetchBanner";
import { Carousel } from "../Carousel/Carousel";

export const ProductSlider = () => {
  const autoplay = useMemo(
    () => Autoplay({ delay: 6000, stopOnInteraction: true }),
    [],
  );
  const Slides = useFetchBanner();

  return (
    <Carousel
      rootClassName="relative w-full h-[400px] overflow-hidden"
      previousClassName="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100"
      nextClassName="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100"
      opts={{ loop: true }}
      plugins={[autoplay]}
      items={
        Slides.data?.data.map((slide, index) => (
          <div key={index} className="relative w-full h-[400px]">
            <img
              src={slide.imageUrl}
              alt="image"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex  items-center px-12 bg-black/30">
              <div className="ml-5 text-white max-w-md">
                <h2 className="text-4xl font-bold">{slide.title}</h2>
                <p className="mt-2">{slide.description}</p>

                <Link
                  href={slide.redirectUrl}
                  className="inline-block mt-4 bg-white text-black px-6 py-2 rounded"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        )) ?? []
      }
    />
  );
};
