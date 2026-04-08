import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>("/cart")).data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number,
): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>("/cart/" + itemId, { quantity }))
    .data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>("/cart/" + id)).data;
};

export const addCartItem = async (
  values: CreateCartItemValues,
): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>("/cart", values)).data;
};


export function fetchCart() {
  throw new Error("Function not implemented.");
}
// export const fetchCart = async (): Promise<CartDTO> => {
//   const { data } = await axiosInstance.get<CartDTO>("/cart");

//   return (await axiosInstance.get<Cart>("/cart")).data;
//   // return data;
// };

// export function removeCartItem(id: number) {
//   throw new Error("Function not implemented.");
// }

// export function updateItemQuantity(id: number, quantity: number) {
//   throw new Error("Function not implemented.");
// }

// export function addCartItem(values: CreateCartItemValues) {
//   throw new Error("Function not implemented.");
// }

// export const updateItemQuantity = async (
//   itemId: number,
//   quantity: number,
// ): Promise<CartDTO> => {
//   return (await axiosInstance.patch<CartDTO>("/cart/" + itemId, { quantity }))
//     .data;
// };

// export const removeCartItem = async (id: number): Promise<CartDTO> => {
//   return (await axiosInstance.delete<CartDTO>("/cart/" + id)).data;
// };

// export const addCartItem = async (
//   values: CreateCartItemValues,
// ): Promise<CartDTO> => {
//   return (await axiosInstance.post<CartDTO>("/cart", values)).data;
// };
