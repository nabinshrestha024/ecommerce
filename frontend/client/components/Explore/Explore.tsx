import { Button } from "@/ui/button";
import { exploreData } from "./exploreData.import";
import { Card } from "../card/Card";
import Image from "next/image";

export const Explore = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-xl">Start exploring now</h1>
        <Button
          variant={"outline"}
          className="rounded-2xl border border-black text-xs"
        >
          View All
        </Button>
      </div>
      <div className="flex gap-10 justify-center text-center">
        {exploreData.map((val) => (
          <Card key={val.id} className="shadow-none">
            <div>
              <Image src={val.image} alt="Image" width={130} height={130} />
              <p className="font-medium">{val.title}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
