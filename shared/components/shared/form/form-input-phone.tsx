"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";

import { cn } from "@/shared/lib/utils";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

export const FormInputPhone: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <IMaskInput
            mask="+380 (00) 000-00-00"
            lazy={false}
            placeholder={placeholder}
            value={field.value}
            onAccept={(value) => field.onChange(value)}
            className={cn(
              "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          />
        )}
      />

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
