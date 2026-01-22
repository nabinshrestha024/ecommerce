import { Card } from "@/components/Card/Card";
import { LoginForm } from "@/components/Login/LoginForm";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-screen relative ">
      <Card rootClassName="w-lg shadow-xl mx-5 md:mx-0">
        <LoginForm />
      </Card>
    </div>
  );
}
