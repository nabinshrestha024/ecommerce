import { Check } from "lucide-react";
import { ContactForm } from "./ContactForm";

const datas = [
  "Saves time and effort as customers can shop 24/7 from anywhere without traveling to a store.",
  "Allows businesses reach more customers by selling to a wider, even global, market.",
  "Reduces business costs since additional expenses are lower compared to traditional stores.",
];
export const Contact = () => {
  return (
    <div className="w-screen ">
      <div className="flex justify-center mt-15">
        <div className="space-y-4">
          <h1 className="font-bold text-5xl text-green-600 w-[500px]">
            Contact our Sales Team
          </h1>
          <p className="italic font-serif text-[18px]">
            Let&apos;s explore how तपाइकोBazar can work for you.
          </p>
          <div className="w-[450px] rounded-md bg-gray-100 p-2">
            {datas.map((data) => (
              <div key={data} className="flex gap-3">
                <Check />
                <div>{data}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
