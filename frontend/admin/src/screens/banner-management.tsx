import { BannerHeader } from "@/components/Banner/BannerHeader";
import { BannerTable } from "@/components/Banner/BannerTable";

export const BannerManagement = () => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <BannerHeader />
      <BannerTable />
    </div>
  );
};
