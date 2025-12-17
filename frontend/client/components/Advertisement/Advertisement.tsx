import { FirstCard } from "./components/FirstCard";
import { FourthCard } from "./components/FourthCard";
import { SecondCard } from "./components/SecondCard";
import { ThirdCard } from "./components/ThirdCard";

export const Advertisement = () => {
  return (
    <div className="flex flex-col px-6 gap-3 w-full items-center">
      <div className="grid grid-cols-3 gap-6 h-[328px] max-w-[1216px] justify-center items-center">
        <FirstCard />
        <SecondCard />
        <ThirdCard />
      </div>
      <div className="max-w-[1216px]">
        <FourthCard />
      </div>
    </div>
  );
};
