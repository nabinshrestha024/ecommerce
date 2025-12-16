import { FirstCard } from "./components/FirstCard";
import { FourthCard } from "./components/FourthCard";
import { SecondCard } from "./components/SecondCard";
import { ThirdCard } from "./components/ThirdCard";

export const Advertisement = () => {
  return (
    <div className="flex flex-col px-20 pt-3 gap-3">
      <div className="grid grid-cols-3 gap-6 h-[328px] items-center">
        <FirstCard />
        <SecondCard />
        <ThirdCard />
      </div>
      <div>
        <FourthCard />
      </div>
    </div>
  );
};
