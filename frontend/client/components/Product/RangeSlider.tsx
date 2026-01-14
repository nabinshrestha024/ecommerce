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
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    if (value <= priceRange[1]) {
      onChangeAction([value, priceRange[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    if (value >= priceRange[0] && value <= (maxPrice || 1000)) {
      onChangeAction([priceRange[0], value]);
    }
  };

  return (
    <div>
      <div>
        <div className="font-bold">Price Range:</div>
        <div className="flex flex-col justify-start gap-2 mb-2">
          <div className="flex flex-col">
            <label className="mr-2 font-medium">Min</label>
            <input
              type="number"
              value={priceRange[0]}
              onChange={handleMinChange}
              min={0}
              max={priceRange[1]}
              className="w-full px-2 py-1 border rounded no-spinner"
              placeholder="Min"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Max</label>
            <input
              type="number"
              value={priceRange[1]}
              onChange={handleMaxChange}
              min={priceRange[0]}
              max={maxPrice || 1000}
              className="w-full px-2 py-1 border rounded no-spinner"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
      <Slider.Root
        value={priceRange}
        onValueChange={(value: [number, number]) =>
          onChangeAction([value[0], value[1]])
        }
        min={0}
        max={maxPrice || 1000}
        step={1000}
        className="relative flex items-center select-none touch-none w-full h-5"
      >
        <Slider.Track className="bg-gray-300 relative flex-1 h-1 cursor-pointer rounded-full">
          <Slider.Range className="absolute bg-green-600 h-1 cursor-pointer rounded-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 cursor-pointer border-green-600 rounded-full shadow-lg 
          hover:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 cursor-pointer border-green-600 rounded-full shadow-lg 
          hover:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        />
      </Slider.Root>
    </div>
  );
};
