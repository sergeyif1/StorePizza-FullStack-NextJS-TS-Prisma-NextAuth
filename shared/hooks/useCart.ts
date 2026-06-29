import React from "react";
import { useCartStore } from "../store";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

interface ReturnProps {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, [cartState.fetchCartItems]);

  return cartState;
};

// export const useCart = (): ReturnProps => {
//   const totalAmount = useCartStore((state) => state.totalAmount);
//   const items = useCartStore((state) => state.items);
//   const loading = useCartStore((state) => state.loading);

//   const fetchCartItems = useCartStore((state) => state.fetchCartItems);

//   const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

//   const removeCartItem = useCartStore((state) => state.removeCartItem);

//   const addCartItem = useCartStore((state) => state.addCartItem);

//   React.useEffect(() => {
//     fetchCartItems();
//   }, [fetchCartItems]);

//   return {
//     totalAmount,
//     items,
//     loading,
//     fetchCartItems,
//     updateItemQuantity,
//     removeCartItem,
//     addCartItem,
//   };
// };
