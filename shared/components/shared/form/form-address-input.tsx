"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddressInput } from "@/shared/components/ui/address-input";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormAddressInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
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
          <AddressInput
            value={field.value}
            onChange={field.onChange}
            onSelect={(val) => field.onChange(val)}
            placeholder="Введіть адресу"
          />
        )}
      />

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
