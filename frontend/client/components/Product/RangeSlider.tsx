"use client";
import * as Slider from "@radix-ui/react-slider";
type PriceSliderProps = {
  priceRange: [number, number];
  onChangeAction: (priceRange: [number, number]) => void;
  maxPrice?: number;
};

export const RangeSlider = ({
  priceRange,
  onChangeAction,
  maxPrice,
}: PriceSliderProps) => {
  return (
    <div>
      <div>
        <div className="font-bold">Price Range:</div>
        {`
      Rs.${priceRange[0]} - Rs.${priceRange[1]}`}
      </div>
      <Slider.Root
        value={priceRange}
        onValueChange={(value: [number, number]) =>
          onChangeAction([value[0], value[1]])
        }
        min={0}
        max={maxPrice || 1000}
        step={10}
        className="relative flex items-center select-none touch-none w-full h-5"
      >
        <Slider.Track className="bg-gray-300 relative flex-1 h-1 rounded-full">
          <Slider.Range className="absolute bg-green-600 h-1 rounded-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-green-600 rounded-full shadow-lg 
          hover:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-green-600 rounded-full shadow-lg 
          hover:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        />
      </Slider.Root>
    </div>
  );
};
