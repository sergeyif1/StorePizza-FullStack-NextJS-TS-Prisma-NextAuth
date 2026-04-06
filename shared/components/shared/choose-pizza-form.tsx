"use client";

import { cn } from "@/shared/lib/utils";
import { ProductImage } from "./product-Image";
import { Title } from "./title";
import { Button } from "../../components/ui/";
import { GroupVariats } from "./group variats";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "../../constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { calcTotalPizzaPrice } from "@/shared/lib/calc-total-pizza-price";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "@/shared/lib/get-available-pizza-sizes";
import React from "react";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items?: ProductItem[];
  onClickAddCart: VoidFunction;
  className?: string;
}

/**
 * Форма выбора ПИЦЦЫ
 */
export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAddCart,
  className,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20);

  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([]),
  );

  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items || [],
    ingredients,
    selectedIngredients,
  );

  const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`;

  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariats
            items={getAvailablePizzaSizes(type, items || [])}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariats
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
