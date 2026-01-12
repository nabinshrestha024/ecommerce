import { useState, type ReactNode } from "react";
import { Button } from "@/ui/button";
import { Dialog } from "../dialog/Dialog";

export const ConfirmationDialog = ({
  trigger,
  confirmFunc,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Yes",
  cancelText = "No",
}: {
  trigger: ReactNode;
  confirmFunc: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "default";
}) => {
  const [open, setOpen] = useState(false);
  const confirmFunction = () => {
    confirmFunc();
    setOpen(false);
  };
  return (
    <Dialog
      triggerText={trigger}
      open={open}
      onOpenChange={setOpen}
      contentClassName="p-0 border-none [&>button]:hidden"
    >
      <div>
        <div className="flex justify-between items-center border-b p-5">
          <div className="text-xl font-bold">{title}</div>
          <div className="flex gap-2">
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              {cancelText}
            </Button>
            <Button variant={"default"} onClick={confirmFunction}>
              {confirmText}
            </Button>
          </div>
        </div>

        <div className="px-4 py-2 bg-[#F89336] mt-4 text-white mb-4">
          {description}
        </div>
      </div>
    </Dialog>
  );
};
