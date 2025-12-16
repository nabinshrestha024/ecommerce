import { Card } from "@/components/card/Card";
import { LoginForm } from "@/components/Login/LoginForm";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-screen relative bg-[#4EA674]">
      <Card rootClassName="w-lg">
        <LoginForm />
      </Card>
    </div>
  );
}
