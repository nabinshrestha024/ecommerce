import { Spinner as Root } from "@/ui/spinner";

export const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/50 z-20">
      <Root className="size-10 text-white" />
    </div>
  );
};
