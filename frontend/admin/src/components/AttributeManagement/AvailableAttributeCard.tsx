import { Card } from "../Card/Card";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "../Dialog/Dialog";
import { useState } from "react";
import {
  useFetchAttribute,
  type AttributeValue,
  type ProductAttribute,
} from "@/hooks/attribute/useFetchAttribute";
import { AddAttributeValueForm } from "./AddAttributeValuesForm";
import { EditAttributeValueForm } from "./EditAttributeValuesForm";
import { MdAddCircleOutline } from "react-icons/md";
import { EditAttributeNameForm } from "./EditAttributeNameForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { DropDown } from "../DropDown/DropDown";
import { BsThreeDotsVertical } from "react-icons/bs";

export const AvailableAttributeCard = () => {
  const { data: attributes } = useFetchAttribute();
  const [selectedAttribute, setSelectedAttribute] = useState<number | null>(
    null,
  );
  const [selectedAttributeValue, setSelectedAttributeValue] =
    useState<AttributeValue | null>(null);

  const [selectedAttributeName, setSelectedAttributeName] =
    useState<ProductAttribute | null>();

  const [addOpen, setAddOpen] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState<number | null>(null);
  const [editAttribOpen, setEditAttribOpen] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {attributes?.map((attribute) => (
        <Card
          key={attribute.attributeId}
          className="group w-full p-0 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200"
          cardClassName="border-none shadow-none p-0"
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value={attribute.attributeId.toString()}>
              <AccordionTrigger className="w-full flex items-center justify-between px-4 py-3  rounded-xl  border-b-none transition-all duration-200  hover:cursor-pointer">
                <div className="text-sm font-bold text-gray-800 ">
                  {attribute.name}
                </div>
                <div className="ml-auto flex item-center">
                  <DropDown
                    trigger={
                      <button>
                        <BsThreeDotsVertical />
                      </button>
                    }
                  >
                    <div
                      className="ml-auto flex flex-col items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Dialog
                        triggerContent={
                          <button
                            onClick={() =>
                              setSelectedAttribute(attribute.attributeId)
                            }
                            className="p-1.5 rounded-md text-gray-400 hover:text-[#4EA674] hover:bg-[#c2f8d9] transition-colors flex items-center gap-2 cursor-pointer"
                            title="Add Attribute"
                          >
                            <MdAddCircleOutline className="text-[18px] cursor-pointer" />
                            Add Attribute
                          </button>
                        }
                        open={addOpen === attribute.attributeId}
                        onOpenChange={(isOpen) => {
                          setAddOpen(isOpen ? attribute.attributeId : null);
                        }}
                      >
                        {selectedAttribute === attribute.attributeId && (
                          <div className="max-h-[70vh] overflow-auto scrollbar-hide">
                            <AddAttributeValueForm
                              attributeId={selectedAttribute}
                              setAddOpen={setAddOpen}
                            />
                          </div>
                        )}
                      </Dialog>

                      <Dialog
                        triggerContent={
                          <button
                            onClick={() => setSelectedAttributeName(attribute)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-[#4EA674] hover:bg-[#c2f8d9] transition-colors flex gap-2 items-center cursor-pointer"
                            title="Edit Attribute"
                          >
                            <FaEdit className="text-[16px] cursor-pointer" />
                            Edit Attribute
                          </button>
                        }
                        open={editOpen == attribute.attributeId}
                        onOpenChange={(isOpen) => {
                          setEditOpen(isOpen ? attribute.attributeId : null);
                        }}
                      >
                        {selectedAttributeName?.attributeId ===
                          attribute.attributeId && (
                          <div className="max-h-[70vh] overflow-auto scrollbar-hide">
                            <EditAttributeNameForm
                              attributeName={selectedAttributeName}
                              setEditOpen={setEditOpen}
                            />
                          </div>
                        )}
                      </Dialog>
                    </div>
                  </DropDown>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="p-4 flex flex-col gap-2">
                  {attribute.values && attribute.values.length > 0 ? (
                    attribute.values.map((val, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 flex justify-between items-center border-b border-b-gray-300 bg-white  text-gray-600 "
                      >
                        <div className="text-[12px] font-medium">
                          {val.value}
                        </div>

                        <Dialog
                          triggerContent={
                            <button
                              onClick={() => {
                                setSelectedAttributeValue(val);
                                setEditAttribOpen(val.attributeValueId);
                              }}
                              className="p-1.5 rounded-md text-gray-400 hover:text-[#4EA674] hover:bg-[#c2f8d9] transition-colors"
                              title="Edit Attribute"
                            >
                              <FaEdit className="text-[14px]" />
                            </button>
                          }
                          open={editAttribOpen == val.attributeValueId}
                          onOpenChange={(isOpen) => {
                            setEditAttribOpen(
                              isOpen ? val.attributeValueId : null,
                            );
                          }}
                        >
                          {selectedAttributeValue && (
                            <div className="max-h-[70vh] overflow-auto scrollbar-hide">
                              <EditAttributeValueForm
                                attributeValues={selectedAttributeValue}
                                setEditAttribOpen={setEditAttribOpen}
                              />
                            </div>
                          )}
                        </Dialog>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs italic text-gray-400">
                      No values assigned
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
    </div>
  );
};
