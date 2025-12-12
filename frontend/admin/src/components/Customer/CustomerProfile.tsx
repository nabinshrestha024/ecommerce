import { Card } from "../Card/Card";
import { FaPhoneAlt } from "react-icons/fa";
import { RxCopy } from "react-icons/rx";
import { MdLocationOn } from "react-icons/md";
import { socialIcons } from "../Customer/SocialMediaIcons.import.ts";
interface Person {
  phone?: string;
  address?: string;
  avatar?: string;
  name?: string;
  email?: string;
  registration?: string;
  lastPurchase?: string;
}
export const CustomerProfile = ({ customer }: { customer: Person }) => {
  return (
    <Card
      className="w-full flex flex-col gap-6 p-5 rounded-lg "
      cardClassName="p-0 border-none w-full border border-[#E5E7EB]"
    >
      <div className="flex items-center gap-4">
        <img
          src={customer.avatar}
          alt={customer.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="w-full flex-flex-col gap-2">
          <div className="text-[18px] font-bold text-[#023337]">
            {customer.name}
          </div>
          <div className="flex justify-between">
            <div className="text-[14px] text-[#6A717F] font-normal">
              {customer.email}
            </div>
            <RxCopy className="text-[#6467F2] text-[13px]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-[14px] font- leading-normal text-[#9CA3AF]">
          Customer Info
        </div>
        <div className="w-full flex items-center gap-3 border border-[#E5E7EB] rounded-sm px-2 py-2.5">
          <FaPhoneAlt className="text-[#023337] text-[13px]" />
          <div className="text-[14px] text-[#6A717F] font-medium">
            {customer.phone}
          </div>
        </div>
        <div className="w-full flex items-center gap-3 border border-[#E5E7EB] rounded-sm px-2 py-2.5">
          <MdLocationOn className="text-[#023337] text-[16px] font-bold" />
          <div className="text-[14px] text-[#6A717F] font-medium">
            {customer.address}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-[14px] font- leading-normal text-[#9CA3AF]">
          Social Media
        </div>
        <div className="flex gap-2">
          {socialIcons.map((icon, index) => (
            <div
              className="border border-[#D1D5DB] rounded-sm p-1 text-[16px]"
              style={{ color: icon.color }}
              key={index}
            >
              {<icon.icon />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-[14px] font- leading-normal text-[#9CA3AF]">
          Activity
        </div>
        <div className="w-full flex-flex-col gap-2">
          <div className="text-[14px]  text-[#4B5563]">
            Registration:&nbsp;
            {customer.registration}
          </div>

          <div className="text-[14px] text-[#4B5563] font-normal">
            Last Purchase: &nbsp;
            {customer.lastPurchase}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-[14px] font- leading-normal text-[#9CA3AF]">
          Order overview
        </div>
        <div className="flex gap-2">
          <Card
            cardClassName="flex flex-col px-[7px] py-3  border border-[#D1D5DB] rounded-sm  text-[16px] shadow-none"
            className="p-0"
          >
            <div className="flex flex-col  gap-2">
              <div className="text-center text-[18px] font-bold text-[#023337]">
                150
              </div>
              <div className="text-center text-[14px] font-normal text-[#6467F2]">
                Total order
              </div>
            </div>
          </Card>

          <Card
            cardClassName="flex flex-col px-[7px] py-3  border border-[#D1D5DB] rounded-sm  text-[16px] shadow-none"
            className="p-0"
          >
            <div className="flex flex-col  gap-2">
              <div className="text-center text-[18px] font-bold text-[#023337]">
                50
              </div>
              <div className="text-center text-[14px] font-normal text-[#21C45D]">
                Completed
              </div>
            </div>
          </Card>

          <Card
            cardClassName="flex flex-col px-[7px] py-3  border border-[#D1D5DB] rounded-sm  text-[16px] shadow-none"
            className="p-0"
          >
            <div className="flex flex-col  gap-2">
              <div className="text-center text-[18px] font-bold text-[#023337]">
                10
              </div>
              <div className="text-center text-[14px] font-normal text-[#EF4343]">
                Canceled
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};
