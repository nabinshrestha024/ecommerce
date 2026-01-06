import { Button } from "@/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import { Dialog } from "../Dialog/Dialog";
import { AddAttributeForm } from "./AddAttributeForm";

export const AttributeHeader = () => {
  return (
    <div className="flex justify-between mb-8 p-3 lg:p-6 items-center">
      <div className="text-[18px] leading-6 font-bold text-[#23272E]">
        Discover
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-full  flex gap-3 items-center rounded-xl ">
          <Dialog
            triggerContent={
              <Button className="px-2 py-1 lg:px-5 lg:py-4 text-[15px] font-bold leading-3 bg-[#4EA674] text-white  rounded-lg hover:bg-[#4EA674]">
                <MdAddCircleOutline className="text-white text-[24px]" />
                Add Attribute
              </Button>
            }
          >
            <AddAttributeForm />
          </Dialog>
          <Button className="px-5 py-4 text-[15px] font-bold leading-3 bg-white border border-[#E5E7EB] text-[#023337] rounded-lg hover:bg-white">
            More
            <BsThreeDotsVertical className="text-[#023337] text-[20px] font-bold" />
          </Button>
        </div>
      </div>
    </div>
  );
};
