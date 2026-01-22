import { useFetchTags } from "@/hooks/filter/useFetchTags";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/ui/button";
import { useEffect, useRef, useState } from "react";
import { RangeSlider } from "./RangeSlider";

type FilterFormValues = {
  minPrice?: string;
  maxPrice?: string;
  tags: string[];
};

interface Tag {
  tagId: string | number;
  name: string;
}

interface FilterProps {
  onFilterChange: (filters: FilterFormValues) => void;
  onClose?: () => void;
  highestPrice?: number;
  selectedFilters?: FilterFormValues;
  isOpen?: boolean;
}

export const Filter = ({
  onFilterChange,
  onClose,
  highestPrice,
  selectedFilters,
  isOpen,
}: FilterProps) => {
  const { data } = useFetchTags();

  const { register, control, setValue, handleSubmit } =
    useForm<FilterFormValues>({
      defaultValues: {
        tags: selectedFilters?.tags ?? [],
        minPrice: selectedFilters?.minPrice ?? "0",
        maxPrice: selectedFilters?.maxPrice ?? String(highestPrice ?? 1000),
      },
    });

  const watchedTags = useWatch({ control, name: "tags" });

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(selectedFilters?.minPrice ?? 0),
    Number(selectedFilters?.maxPrice ?? highestPrice ?? 1000),
  ]);

  const prevTagsRef = useRef<string[]>(selectedFilters?.tags ?? []);
  const isInitialMount = useRef(true);
  const prevPriceRef = useRef<[number, number]>([
    Number(selectedFilters?.minPrice ?? 0),
    Number(selectedFilters?.maxPrice ?? highestPrice ?? 1000),
  ]);

  useEffect(() => {
    if (!watchedTags) return;
    if (isOpen === false) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (JSON.stringify(watchedTags) === JSON.stringify(prevTagsRef.current)) {
      return;
    }

    prevTagsRef.current = watchedTags;

    onFilterChange({
      tags: watchedTags,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    });
  }, [watchedTags, isOpen]);

  useEffect(() => {
    setValue("minPrice", priceRange[0].toString(), { shouldDirty: true });
    setValue("maxPrice", priceRange[1].toString(), { shouldDirty: true });
  }, [priceRange]);

  useEffect(() => {
    if (!selectedFilters) return;

    const newMinPrice = Number(selectedFilters.minPrice ?? 0);
    const newMaxPrice = Number(
      selectedFilters.maxPrice ?? highestPrice ?? 1000,
    );

    // Only update if prices actually changed (not just parent re-render)
    if (
      newMinPrice !== prevPriceRef.current[0] ||
      newMaxPrice !== prevPriceRef.current[1]
    ) {
      prevPriceRef.current = [newMinPrice, newMaxPrice];
      setPriceRange([newMinPrice, newMaxPrice]);
    }

    setValue("tags", selectedFilters.tags);
    prevTagsRef.current = selectedFilters.tags;
  }, [selectedFilters]);

  const handleFormSubmit = (data: FilterFormValues) => {
    onFilterChange({
      tags: data.tags || watchedTags,
      minPrice: String(priceRange[0]),
      maxPrice: String(priceRange[1]),
    });
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col">
      <h2 className="font-semibold mb-3">Filter</h2>
      <div className="max-h-[30vh] h-full md:max-h-42 overflow-auto">
        {data?.data?.map((tag: Tag) => (
          <div key={tag.tagId} className="flex gap-3 items-center">
            <label key={tag.tagId} className="flex gap-3 ">
              <input type="checkbox" value={tag.name} {...register("tags")} />
              {tag.name}
            </label>
          </div>
        ))}
      </div>

      <RangeSlider
        priceRange={priceRange}
        onChangeAction={setPriceRange}
        maxPrice={highestPrice}
      />

      <Button type="submit" className="mt-4">
        Apply Filters
      </Button>
    </form>
  );
};
