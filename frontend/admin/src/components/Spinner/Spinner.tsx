import { Spinner as Root } from "@/ui/spinner";

export const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
      <Root />
    </div>
  );
};
