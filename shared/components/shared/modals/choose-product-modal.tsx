"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Ingredient, Product } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { ChooseProductForm } from "../choose-product-form";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

interface ProductWithRelations extends Product {
  ingredients?: Ingredient[];
  items?: any[];
}

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  const safeProduct = {
    ...product,
    items: product.items ?? [],
    ingredients: product.ingredients ?? [],
  };

  const firstItem = safeProduct.items[0];

  if (!firstItem) {
    return null;
  }

  const isPizzaForm = safeProduct.items.some((item) => item.pizzaType !== null);

  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients: ingredients ?? [],
      });

      toast.success(`${safeProduct.name} добавлен в корзину`);
      router.back();
    } catch (err) {
      toast.error(`${safeProduct.name} не удалось добавить в корзину`);
      console.error(err);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className,
        )}>
        <VisuallyHidden.Root>
          <DialogTitle className="sr-only">{safeProduct.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Выбор товара и добавление в корзину
          </DialogDescription>
        </VisuallyHidden.Root>

        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={safeProduct.imageUrl}
            name={safeProduct.name}
            ingredients={safeProduct.ingredients}
            items={safeProduct.items}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={safeProduct.imageUrl}
            name={safeProduct.name}
            price={firstItem.price}
            onSubmit={onSubmit}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

// "use client";

// import React, { use } from "react";
// import {
//   Dialog,
//   DialogPortal,
//   DialogOverlay,
//   DialogClose,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// } from "@/shared/components/ui/dialog";
// import { Ingredient, Product } from "@prisma/client";
// import { cn } from "@/shared/lib/utils";
// import { useRouter } from "next/navigation";
// import { ChoosePizzaForm } from "../choose-pizza-form";
// import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
// import { useCartStore } from "@/shared/store";
// import toast from "react-hot-toast";

// interface ProductWithRelations extends Product {
//   ingredients?: Ingredient[];
//   items?: any[];
// }

// interface Props {
//   product: ProductWithRelations;
//   className: string;
// }

// export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
//   const router = useRouter();
//   const firstItem = product.items?.[0];
//   if (!firstItem) return null;
//   const isPizzaForm = Boolean(firstItem.pizzaType);
//   const addCartItem = useCartStore((state) => state.addCartItem);
//   const loading = useCartStore((state) => state.loading);

//   const onAddProduct = () => {
//     addCartItem({
//       productItemId: firstItem.id,
//     });
//   };

//   const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
//     try {
//       const itemId = productItemId ?? firstItem.id;
//       await addCartItem({
//         productItemId: itemId,
//         ingredients: ingredients ?? [],
//       });

//       toast.success(product.name + "добавлен в корзину");
//       router.back();
//     } catch (err) {
//       toast.error(product.name + "не удалось добавить в корзину");
//       console.error(err);
//     }
//   };
//   return (
//     <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
//       <DialogContent
//         className={cn(
//           "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
//           className,
//         )}>
//         <VisuallyHidden.Root>
//           <DialogTitle>{product.name}</DialogTitle>
//           <DialogDescription>
//             Выбор товара и добавление в корзину
//           </DialogDescription>
//         </VisuallyHidden.Root>

//         {isPizzaForm ? (
//           <ChoosePizzaForm
//             imageUrl={product.imageUrl}
//             name={product.name}
//             ingredients={product.ingredients || []}
//             items={product.items || []}
//             onSubmit={onSubmit}
//             loading={loading}
//           />
//         ) : (
//           <ChoosePizzaForm
//             imageUrl={product.imageUrl}
//             name={product.name}
//             onSubmit={onSubmit}
//             price={firstItem.price}
//             loading={loading}
//           />
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };
