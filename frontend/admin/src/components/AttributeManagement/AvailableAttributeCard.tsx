import { Card } from "../Card/Card";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "../Dialog/Dialog";
import { useState } from "react";
import { EditAttributeForm } from "./EditAttributeForm";
import { useFetchAttribute } from "@/hooks/attribute/useFetchAttribute";

export const AvailableAttributeCard = () => {
  const { data: attributes } = useFetchAttribute();
  const [selectedAttribute, setSelectedAttribute] = useState<number | null>(
    null,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {attributes?.map((attribute) => (
        <Card
          key={attribute.attributeId}
          className="group w-full p-0 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200"
          cardClassName="border-none shadow-none"
        >
          <div className="flex items-center justify-between bg-gray-50/50 px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 truncate">
              {attribute.name}
            </h3>

            <Dialog
              triggerContent={
                <button
                  onClick={() => setSelectedAttribute(attribute.attributeId)}
                  className="p-1.5 rounded-md text-gray-400 hover:text-[#4EA674] hover:bg-[#c2f8d9] transition-colors"
                  title="Edit Attribute"
                >
                  <FaEdit className="text-[14px]" />
                </button>
              }
            >
              {selectedAttribute === attribute.attributeId && (
                <div className="max-h-[70vh] overflow-auto scrollbar-hide">
                  <EditAttributeForm attributeId={selectedAttribute} />
                </div>
              )}
            </Dialog>
          </div>

          <div className="p-4 flex flex-wrap gap-2">
            {attribute.values && attribute.values.length > 0 ? (
              attribute.values.map((val, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[12px] font-medium bg-white border border-gray-200 text-gray-600 rounded-full"
                >
                  {val.value}
                </span>
              ))
            ) : (
              <span className="text-xs italic text-gray-400">
                No values assigned
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
