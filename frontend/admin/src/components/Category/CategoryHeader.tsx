import { Button } from "@/ui/button";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";

export const CategoryHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mb-8">
      <div className="text-[18px] leading-6 font-bold text-[#23272E]">
        Discover
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-full  flex gap-3 items-center rounded-xl ">
          <Button
            onClick={() => navigate("/product-management")}
            className="px-5 py-4 text-[15px] font-bold leading-3 bg-[#4EA674] text-white  rounded-lg hover:bg-[#4EA674]"
          >
            <MdAddCircleOutline className="text-white text-[24px]" />
            Add Product
          </Button>
          <Button className="px-5 py-4 text-[15px] font-bold leading-3 bg-white border border-[#E5E7EB] text-[#023337] rounded-lg hover:bg-white">
            More
            <BsThreeDotsVertical className="text-[#023337] text-[20px] font-bold" />
          </Button>
        </div>
      </div>
    </div>
  );
};
