import { Card } from "@/components/card/Card";

export const SecondCard = () => {
  return (
    <Card
      rootClassName="p-0 shadow-none border-none"
      className="p-4 pb-6 h-full border shadow-lg w-auto rounded-2xl bg-white"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Gaming accessories
        </h2>
        <div className="grid grid-cols-2 gap-4 px-2">
          <div className="overflow-hidden rounded-lg shadow-md h-25 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
              src="/advertisement/headphone.png"
              alt="Gaming accessory 1"
              className="w-full h-auto object-contain rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-md h-25 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
              src="/advertisement/mouse.png"
              alt="Gaming accessory 2"
              className="w-full h-auto object-contain rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-md h-25 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex justify-center items-center">
            <img
              src="/advertisement/controller.png"
              alt="Gaming accessory 3"
              className="w-full h-auto object-contain rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-md h-25 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
              src="/advertisement/chair.png"
              alt="Gaming accessory 4"
              className="w-full h-auto object-contain rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
