import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";
import { calculateOrderPrices } from "@/shared/lib/order/calculate-order";

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
}) => {
  const prices = calculateOrderPrices(totalAmount);

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Разом до сплати</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="text-[34px] font-extrabold">
            {prices.totalPrice} ₴
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Вартість замовлення:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount}`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            ПДВ 20%:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${prices.vatPrice}`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Вартість доставки:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${prices.deliveryPrice}`
          )
        }
      />
      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Оформити замовлення
        <ArrowRight className="w-5 mt-2" />
      </Button>
    </WhiteBlock>
  );
};
