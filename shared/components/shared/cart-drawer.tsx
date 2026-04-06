"use client";

import React, { useEffect } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  // SheetDescription,
} from "@/shared/components/ui/sheet";

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-Item";
import { getCartItemDetails } from "@/shared/lib/get-cart-items-detals";
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks";

interface Props {
  className?: string;
  items?: Array<unknown>;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  // className,
}) => {
  // function setRedirecting(arg0: boolean): void {
  //   throw new Error("Function not implemented.");
  // }

  // const { totalAmount, fetchCartItems, items } = useCartStore((state) => ({
  //   totalAmount: state.totalAmount,
  //   fetchCartItems: state.fetchCartItems,
  //   items: state.items,
  // }));

  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mz-6 mt-5 overflow-auto scrollbar flex-1">
          <div className="mb-2">
            {items.map((item) => (
              <CartDrawerItem
                id={item.id}
                key={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as unknown as PizzaType,
                        item.pizzaSize as PizzaSize,
                      )
                    : " "
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        {/* Items*/}

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого ₴
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₴</span>
            </div>

            <Link href="/cart">
              <Button
                // onClick={() => setRedirecting(true)}
                type="submit"
                className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
