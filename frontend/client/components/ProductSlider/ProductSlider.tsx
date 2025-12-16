"use client";

import { Carousel } from "../carousel/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";
import { Slides } from "./constants/Slides";
export const ProductSlider = () => {
  const autoplay = useMemo(
    () => Autoplay({ delay: 6000, stopOnInteraction: true }),
    [],
  );

  return (
    <Carousel
      rootClassName="relative w-full h-80"
      contentClassName=""
      previousClassName="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100"
      nextClassName="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100"
      opts={{ loop: true }}
      plugins={[autoplay]}
      items={Slides.map((slide) => (
        <div key={slide.key}>
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full relative h-80 object-cover rounded-lg"
          />
          {slide.showOverlay && (
            <div className="absolute inset-0 flex items-center px-12 bg-black/30">
              <div className="text-white max-w-md pl-12">
                <h2 className="text-4xl font-bold">Big Sale</h2>
                <p className="mt-2">Up to 50% off electronics</p>
                <button className="mt-4 bg-white text-black px-6 py-2 rounded">
                  Shop Now
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    />
  );
};
