import React from "react";
import { FormInput, FormInputPhone } from "../form";
import { WhiteBlock } from "../white-block";
import { cn } from "@/shared/lib/utils";

interface Props {
  disabled?: boolean;
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({
  className,
  disabled,
}) => {
  return (
    <WhiteBlock
      title="2. Персональні дані"
      className={cn(className, disabled && "opacity-40")}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          name="firstName"
          className="text-base"
          placeholder="Ім'я"
          disabled={disabled}
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Прізвище"
          disabled={disabled}
        />
        <FormInput
          name="email"
          className="text-base"
          placeholder="E-mail"
          disabled={disabled}
        />
        <FormInputPhone name="phone" placeholder="+380 (__) ___-__-__"  />
      </div>
    </WhiteBlock>
  );
};
