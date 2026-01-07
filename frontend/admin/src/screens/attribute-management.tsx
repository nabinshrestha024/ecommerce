import { AttributeHeader } from "@/components/AttributeManagement/AttributeHeader";
import { AvailableAttributeCard } from "@/components/AttributeManagement/AvailableAttributeCard";

export const AttributeManagement = () => {
  return (
    <div className="p-3 flex flex-col gap-5">
      <AttributeHeader />
      <AvailableAttributeCard />
    </div>
  );
};
