import { PizzaType, PizzaSize, mapPizzaType } from "../constants/pizza";
// import { Ingredient } from "@prisma/client";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];

    details.push(`${pizzaSize} см, ${typeName} тесто`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
