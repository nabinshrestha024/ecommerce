import { Card } from "@/components/Card/Card";
import { RegisterForm } from "@/components/Register/RegisterForm";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-screen relative ">
      <Card rootClassName="w-lg shadow-xl">
        <RegisterForm />
      </Card>
    </div>
  );
}
