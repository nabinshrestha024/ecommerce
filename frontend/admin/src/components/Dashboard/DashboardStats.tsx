import { CardComponent } from "./CardComponent";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 w-full lg:gap-5 mt-5 ">
      <CardComponent title="Total Sales">
        <>
          <div className="text-3xl font-semibold mt-5">$350K</div>
          <div className="mt-3 text-sm text-gray-500 font-medium">
            Previous 7days <span className="text-blue-500">($235)</span>
          </div>
        </>
      </CardComponent>

      <CardComponent title="Total Orders">
        <>
          <div className="text-3xl font-semibold mt-5">10.7K</div>
          <div className="mt-3 text-sm text-gray-500 font-medium">
            Previous 7days <span className="text-blue-500">(7.6K)</span>
          </div>
        </>
      </CardComponent>

      <CardComponent title="Pending & Canceled">
        <div className="grid grid-cols-2 gap-2 lg:gap-5 mt-5 mb-1">
          <div>
            <div className="text-[14px] lg:text-lg font-semibold">Pending</div>
            <div className="text-[16px] lg:text-2xl font-semibold text-green-500">
              509
            </div>
          </div>
          <div>
            <div className="text-[14px] lg:text-lg font-semibold">Canceled</div>
            <div className="text-[16px] lg:text-2xl font-semibold text-red-500">
              94
            </div>
          </div>
        </div>
      </CardComponent>
    </div>
  );
};
