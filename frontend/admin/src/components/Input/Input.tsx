import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import { Input as Root } from "@/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { ChevronDownIcon, Eye, EyeOff } from "lucide-react";
import { useState, type ReactNode } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
  icon?: ReactNode;
  error?: string;
}

export const Input = ({
  type,
  placeholder,
  className,
  icon,
  error,
  ...props
}: InputProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [password, setPassword] = useState(true);
  return type === "date" ? (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-48 justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
          {...props}
        />
      </PopoverContent>
    </Popover>
  ) : type === "phone" ? (
    <div>
      <Root
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        onInput={(e) => {
          e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
        }}
        maxLength={10}
        className={className}
        placeholder={placeholder}
        {...props}
      />
      {error && <div className="text-[14px] text-red-500 mt-3">{error}</div>}
    </div>
  ) : type === "password" ? (
    <div className={cn("relative w-full", className)}>
      <Root
        type={!password ? "text" : "password"}
        className="pr-10"
        {...props}
        placeholder={placeholder}
      />

      <button
        type="button"
        onClick={() => setPassword((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground hover:text-foreground"
      >
        {!password ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </button>
      {error && <div className="text-[14px] text-red-500 mt-3">{error}</div>}
    </div>
  ) : type === "textarea" ? (
    <div>
      <textarea
        className={className}
        placeholder={placeholder}
        {...props}
      ></textarea>
      {error && <div className="text-[14px] text-red-500 mt-3">{error}</div>}
    </div>
  ) : (
    <div>
      <Root
        type={type}
        className={className}
        placeholder={placeholder}
        {...props}
      />
      {error && <div className="text-[14px] text-red-500 mt-3">{error}</div>}
    </div>
  );
};
