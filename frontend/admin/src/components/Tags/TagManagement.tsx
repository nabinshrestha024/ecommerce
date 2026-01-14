import { useFetchTag } from "@/hooks/tags/useFetchTag";
import { Button } from "@/ui/button";
import { GoPlusCircle, GoTag } from "react-icons/go";
import { Dialog } from "../Dialog/Dialog";
import { AddTagForm } from "./AddTagForm";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { EditTagForm } from "./EditTagForm";
export const TagManagement = () => {
  const { data, isLoading, isError, error } = useFetchTag();
  const [addTagOpen, setAddTagOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<{ [key: string]: boolean }>({});

  return (
    <div className="p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GoTag className="text-[#4EA674]" />
            Tag Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize and label your content with custom tags.
          </p>
        </div>
        <Dialog
          open={addTagOpen}
          onOpenChange={setAddTagOpen}
          triggerContent={
            <Button className="px-5 py-4 text-[15px] font-bold leading-3 bg-[#4EA674] text-white  rounded-lg hover:bg-[#4EA674]">
              <GoPlusCircle size={20} />
              Create New Tag
            </Button>
          }
        >
          <AddTagForm setOpen={setAddTagOpen} />
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Active Tags ({data?.length || 0})
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-red-600 font-medium">
              {error?.message || "Failed to load tags"}
            </p>
          </div>
        ) : data?.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <GoTag size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              No tags found. Start by creating one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
            {data?.map((val) => (
              <div
                key={val.tagId}
                className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-green-200 hover:bg-green-50/30 transition-all duration-200 shadow-sm hover:cursor-pointer"
              >
                <div className="flex items-center gap-3 w-full overflow-hidden justify-between">
                  <div className="flex flex-row items-center gap-2 ">
                    <div className="flex flex-row w-2 h-2  rounded-full bg-[#4EA674] shrink-0" />
                    <span className="font-medium text-gray-700 truncate ">
                      {val.name}
                    </span>
                  </div>
                  <Dialog
                    key={val.tagId}
                    open={editOpen[val.tagId] || false}
                    onOpenChange={(open) =>
                      setEditOpen((prev) => ({ ...prev, [val.tagId]: open }))
                    }
                    triggerContent={
                      <SquarePen className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                    }
                  >
                    <EditTagForm
                      tag={{ tagId: val.tagId, name: val.name }}
                      setOpen={(open) =>
                        setEditOpen((prev) => ({ ...prev, [val.tagId]: open }))
                      }
                    />
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
