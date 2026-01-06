import { Card } from "../Card/Card";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "../Dialog/Dialog";
import { useState } from "react";
import { EditAttributeForm } from "./EditAttributeForm";
import { useFetchAttribute } from "@/hooks/attribute/useFetchAttribute";

export const AvailableAttributeCard = () => {
  const fetchAttribute = useFetchAttribute();

  const [selectedAttribute, setSelectedAttribute] = useState<number>();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
      {fetchAttribute.data?.map((attribute, index) => (
        <Card
          key={index}
          className=" w-full p-0 rounded-md "
          cardClassName=" p-3 border border-[#E5E7EB] shadow-sm "
        >
          <div className="relative flex flex-col gap-3 ">
            <Dialog
              triggerContent={
                <div
                  className="absolute top-0 right-0"
                  onClick={() => setSelectedAttribute(attribute.attributeId)}
                >
                  <FaEdit className="text-[16px]" />
                </div>
              }
            >
              {selectedAttribute && (
                <div className="max-h-[70vh] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <EditAttributeForm attributeId={selectedAttribute} />
                </div>
              )}
            </Dialog>
            <div className="text-[16px] font-semibold">{attribute.name}</div>
            <div className="flex flex-col gap-2 items-ce">
              <div className="text-[14px] font-normal">
                {attribute.values?.map((value, index) => (
                  <div key={index}>
                    <div className="text-[14px] font-normal">{value.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
