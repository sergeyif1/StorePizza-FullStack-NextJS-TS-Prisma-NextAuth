import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = (item.ingredients ?? []).reduce(
    (acc: number, ingredient) => acc + ingredient.price,
    0,
  );

  const productPrice = item.productItem?.price ?? 0;

  return (ingredientsPrice + productPrice) * item.quantity;
};

// export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
//   const ingredientsPrice = item.ingredients?.reduce(
//     (acc: number, ingredient) => acc + ingredient.price,
//     0,
//   );

//   return (ingredientsPrice + item.productItem.price) * item.quantity;
// };
