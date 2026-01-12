import { useFetchTags } from "@/hooks/filter/useFetchTags";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RangeSlider } from "./RangeSlider";
type FilterFormValues = {
  minPrice: string;
  maxPrice: string;
  tags: string[];
};

interface FilterProps {
  onFilterChange: (filters: FilterFormValues) => void;
}

export const Filter = ({ onFilterChange }: FilterProps) => {
  const { data } = useFetchTags();
  const searchParams = useSearchParams();
  const filterdata = data?.data;
  const selectTags = filterdata?.slice(0, 5);
  const tagsFromUrl = searchParams.get("tags");
  const minPriceFromUrl = searchParams.get("minPrice");
  const maxPriceFromUrl = searchParams.get("maxPrice");
  const [showMore, setShowMore] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const { handleSubmit, register, setValue } = useForm<FilterFormValues>({
    defaultValues: {
      minPrice: minPriceFromUrl || "",
      maxPrice: maxPriceFromUrl || "",
      tags: tagsFromUrl ? tagsFromUrl.split(",") : [],
    },
  });

  const onSubmit = (formData: FilterFormValues) => {
    onFilterChange(formData);
  };
  useEffect(() => {
    setValue("minPrice", priceRange[0].toString());
    setValue("maxPrice", priceRange[1].toString());
  }, [priceRange, setValue]);
  return (
    <div className="hidden md:block">
      <div className="text-xl font-semibold underline mb-4">Filter</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Tags</h3>
          {(showMore ? data?.data : selectTags)?.map(
            (tag: { tagId: number; name: string }) => (
              <div key={tag.tagId} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={tag.name}
                  {...register("tags")}
                  className="h-4 w-4 border-gray-300 rounded cursor-pointer accent-[#01a73e] dark:accent-emerald-600"
                />
                <label className="ml-2 cursor-pointer">{tag.name}</label>
              </div>
            ),
          )}
          <div>
            <Button
              type="button"
              variant="link"
              className="p-0"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <RangeSlider priceRange={priceRange} onChangeAction={setPriceRange} />
          <input
            type="hidden"
            value={priceRange[0]}
            {...register("minPrice")}
          />
          <input
            type="hidden"
            value={priceRange[1]}
            {...register("maxPrice")}
          />

          <Button type="submit" className="mt-4">
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  );
};
