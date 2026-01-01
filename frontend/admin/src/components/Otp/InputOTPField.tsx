"use client";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/ui/input-otp";

interface InputOTPFieldProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
  slotClassName?: string;
  disabled?: boolean;
}

export const InputOTPField = ({
  value,
  onChange,
  length = 6,
  className,
  slotClassName,
  disabled,
}: InputOTPFieldProps) => {
  return (
    <InputOTP
      value={value}
      onChange={onChange}
      maxLength={length}
      disabled={disabled}
    >
      <InputOTPGroup className={className}>
        {Array.from({ length }).map((_, index) => (
          <InputOTPSlot key={index} index={index} className={slotClassName} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};
