"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-Item";
import { getCartItemDetails } from "@/shared/lib/get-cart-items-detals";
import { useCart } from "@/shared/hooks";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const [redirecting, setRedirecting] = React.useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>

          <SheetDescription className="sr-only">
            Список товаров в корзине, изменение количества и оформление заказа
          </SheetDescription>
        </SheetHeader>

        <div className="mx-6 mt-5 overflow-auto scrollbar flex-1">
          {items.map((item) => (
            <div key={item.id} className="mb-2">
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize,
                )}
                disabled={item.disabled}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="mb-4 flex">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого ₴
                <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
              </span>

              <span className="text-lg font-bold">{totalAmount} ₴</span>
            </div>

            <Link href="/checkout">
              <Button
                onClick={() => setRedirecting(true)}
                loading={redirecting}
                type="button"
                className="h-12 w-full text-base">
                Оформить заказ
                <ArrowRight className="ml-2 w-5" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

// "use client";

// import React from "react";
// import { Image } from "next/image";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetDescription,
// } from "@/shared/components/ui/sheet";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { CartDrawerItem } from "./cart-drawer-Item";
// import { getCartItemDetails } from "@/shared/lib/get-cart-items-detals";
// import { cn } from "@/shared/lib/utils";
// import { useCart } from "@/shared/hooks";
// import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
// import { Title } from "./title";

// interface Props {
//   className?: string;
//   items?: Array<unknown>;
// }

// export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
//   const {
//     totalAmount,
//     items,
//     fetchCartItems,
//     updateItemQuantity,
//     removeCartItem,
//   } = useCart();
//   // const totalAmount = useCartStore((state) => state.totalAmount);
//   // const items = useCartStore((state) => state.items);
//   // const fetchCartItems = useCartStore((state) => state.fetchCartItems);
//   // const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
//   // const removeCartItem = useCartStore((state) => state.removeCartItem);

//   // React.useEffect(() => {
//   //   fetchCartItems();
//   // }, [fetchCartItems]);

//   const onClickCountButton = (
//     id: number,
//     quantity: number,
//     type: "plus" | "minus",
//   ) => {
//     const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
//     updateItemQuantity(id, newQuantity);
//   };

//   const [redirecting, setRedirecting] = React.useState(false);

//   return (
//     <Sheet>
//       <SheetTrigger asChild>{children}</SheetTrigger>

//       <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
//         <SheetHeader>
//           <SheetTitle>
//             В корзине <span className="font-bold">{items.length} товара</span>
//           </SheetTitle>

//           <SheetDescription className="sr-only">
//             Список товаров в корзине, изменение количества и оформление заказа
//           </SheetDescription>
//         </SheetHeader>

//         <div className="mz-6 mt-5 overflow-auto scrollbar flex-1">
//           {items.map((item) => (
//             <div key={item.id} className="mb-2">
//               <CartDrawerItem
//                 // key={item.id}
//                 id={item.id}
//                 imageUrl={item.imageUrl}
//                 details={getCartItemDetails(
//                   item.ingredients,
//                   item.pizzaType as PizzaType,
//                   item.pizzaSize as PizzaSize,
//                 )}
//                 disabled={item.disabled}
//                 name={item.name}
//                 price={item.price}
//                 quantity={item.quantity}
//                 onClickCountButton={(type) =>
//                   onClickCountButton(item.id, item.quantity, type)
//                 }
//                 onClickRemove={() => removeCartItem(item.id)}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Items*/}

//         <SheetFooter className="-mx-6 bg-white p-8">
//           <div className="w-full">
//             <div className="flex mb-4">
//               <span className="flex flex-1 text-lg text-neutral-500">
//                 Итого ₴
//                 <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
//               </span>

//               <span className="font-bold text-lg">{totalAmount} ₴</span>
//             </div>

//             <Link href="/checkout">
//               <Button
//                 onClick={() => setRedirecting(true)}
//                 loading={redirecting}
//                 type="submit"
//                 className="w-full h-12 text-base">
//                 Оформить заказ
//                 <ArrowRight className="w-5 ml-2" />
//               </Button>
//             </Link>
//           </div>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// };
