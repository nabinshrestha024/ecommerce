import { useAddProductTags } from "@/hooks/productTags/useAddProductTags";
import { useFetchProductTags } from "@/hooks/productTags/useFetchProductTags";
import { useRemoveProductTags } from "@/hooks/productTags/useRemoveProductTags";
import { useFetchTag } from "@/hooks/tags/useFetchTag";
import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { IoMdRemoveCircle } from "react-icons/io";

export const TagForm = ({ id }: { id: number }) => {
  const { data, isLoading } = useFetchProductTags(id);
  const tags = useFetchTag();
  const addProductTags = useAddProductTags();
  const removeProductTags = useRemoveProductTags();

  const availableTags = tags.data?.filter(
    (tag) => !data?.some((existing) => existing.tagId === tag.tagId),
  );

  const [selectedTag, setSelectedTag] = useState<number | null>();

  const handleTagAdd = () => {
    addProductTags.mutate({ productId: id, tagId: selectedTag || 0 });
    setSelectedTag(null);
  };

  const handleTagDelete = (tagId: number) => {
    removeProductTags.mutate({ productId: id, tagId: tagId });
    setSelectedTag(null);
  };

  return (
    <div className="rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Product Tags</h2>
      </div>

      <div className="flex gap-3 items-center">
        <Select onValueChange={(value) => setSelectedTag(Number(value))}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>

          <SelectContent>
            {availableTags?.map((val) => (
              <SelectItem key={val.tagId} value={String(val.tagId)}>
                {val.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          size="sm"
          className="gap-1"
          disabled={!selectedTag}
          onClick={handleTagAdd}
        >
          <Plus size={16} />
          Add Tag
        </Button>
      </div>

      <div>
        <div className="text-sm font-medium mb-2 text-muted-foreground">
          Added Tags
        </div>

        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading tags...</div>
        ) : data?.length ? (
          <div className="flex flex-wrap gap-2">
            {data.map((val) => (
              <div
                key={val.tagId}
                className="px-3 py-1 border text-sm rounded-xl flex gap-2 items-center justify-center"
              >
                {val.name}
                <IoMdRemoveCircle
                  className="text-red-500 text-lg cursor-pointer"
                  onClick={() => handleTagDelete(val.tagId)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            No tags added yet.
          </div>
        )}
      </div>
    </div>
  );
};
