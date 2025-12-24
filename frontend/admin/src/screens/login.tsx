import { Card } from "@/components/Card/Card";
import { AdminLoginForm } from "@/components/Login/LoginForm";

export const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen relative ">
      <Card cardClassName="p-0 border-none shadow-xl w-lg">
        <AdminLoginForm />
      </Card>
    </div>
  );
};
