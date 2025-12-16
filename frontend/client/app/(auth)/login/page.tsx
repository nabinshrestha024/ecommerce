import { Card } from "@/components/card/Card";
import { LoginForm } from "@/components/Login/LoginForm";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-screen relative bg-[#d6d6d6]">
      <Card rootClassName="w-lg h-auto" className="py-7">
        <LoginForm />
      </Card>
    </div>
  );
}
