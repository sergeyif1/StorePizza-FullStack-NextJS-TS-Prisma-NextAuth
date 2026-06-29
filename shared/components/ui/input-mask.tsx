"use client";

import React from "react";
import { IMaskInput } from "react-imask";
import { cn } from "@/shared/lib/utils";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  name?: string;
}

export const InputMask = React.forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, className, ...props }, ref) => {
    return (
      <IMaskInput
        {...props}
        mask="+380 (00) 000-00-00"
        value={value}
        inputRef={ref}
        unmask={false}
        lazy={false}
        onAccept={(value) => onChange?.(String(value))}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    );
  },
);

InputMask.displayName = "InputMask";
