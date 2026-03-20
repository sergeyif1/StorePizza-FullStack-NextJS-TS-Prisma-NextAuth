"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Ingredient, Product } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm } from "../choose-pizza-form";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Props {
  product: ProductWithRelations;
  className: string;
}

interface ProductWithRelations extends Product {
  // adjust these types to match your Prisma schema (e.g. Ingredient[] / Item[] types)
  ingredients?: any[];
  items?: any[];
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = product.items && product.items.length > 0;

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}>
        <DialogTitle>
          {isPizzaForm ? (
            <ChoosePizzaForm
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients || []}
              items={product.items || []}
              onClickAddCart={() => {}}
            />
          ) : (
            <ChoosePizzaForm
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients || []}
              onClickAddCart={() => {}}
            />
          )}
        </DialogTitle>
        <DialogDescription asChild>
          <VisuallyHidden.Root>
            Текст для экранного читателя
          </VisuallyHidden.Root>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
