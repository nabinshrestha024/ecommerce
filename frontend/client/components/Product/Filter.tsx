import { useFetchTags } from "@/hooks/filter/useFetchTags";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { useSearchParams } from "next/navigation";
import { Input } from "../Input/Input";

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

  const tagsFromUrl = searchParams.get("tags");
  const minPriceFromUrl = searchParams.get("minPrice");
  const maxPriceFromUrl = searchParams.get("maxPrice");

  const { handleSubmit, register } = useForm<FilterFormValues>({
    defaultValues: {
      minPrice: minPriceFromUrl || "",
      maxPrice: maxPriceFromUrl || "",
      tags: tagsFromUrl ? tagsFromUrl.split(",") : [],
    },
  });

  const onSubmit = (formData: FilterFormValues) => {
    onFilterChange(formData);
  };

  return (
    <div>
      <div className="text-xl font-semibold underline mb-4">Filter</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Tags</h3>
          {data?.data?.length ? (
            data.data.map((tag: { tagId: number; name: string }) => (
              <div key={tag.tagId} className="mb-1">
                <input
                  type="checkbox"
                  id={`tag-${tag.tagId}`}
                  value={tag.name}
                  {...register("tags")}
                  className="mr-2"
                />
                <label htmlFor={`tag-${tag.tagId}`}>{tag.name}</label>
              </div>
            ))
          ) : (
            <p>Loading tags...</p>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <div className="flex flex-col">
            <label htmlFor="minPrice">Min Price</label>
            <Input
              id="minPrice"
              type="number"
              placeholder="Min price"
              {...register("minPrice")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="maxPrice">Max Price</label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Max price"
              {...register("maxPrice")}
            />
          </div>

          <Button type="submit" className="mt-4">
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  );
};
