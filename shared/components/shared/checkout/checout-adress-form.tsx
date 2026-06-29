import React from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form";
import { FormAddressInput } from "../form/form-address-input";
import { cn } from "@/shared/lib/utils";

interface Props {
  disabled?: boolean;
  className?: string;
}

export const CheckoutAdressForm: React.FC<Props> = ({
  className,
  disabled,
}) => {
  return (
    <WhiteBlock
      title="3. Адреса доставки"
      className={cn(className, disabled && "opacity-40")}>
      <div className="flex flex-col gap-5">
        <FormAddressInput name="address" className="text-base" />

        <FormTextarea
          className="text-base"
          placeholder="Додаток до замовлення"
          rows={5}
          name="comment"
          disabled={disabled}
        />
      </div>
    </WhiteBlock>
  );
};
