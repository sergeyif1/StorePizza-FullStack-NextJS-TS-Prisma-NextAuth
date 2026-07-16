const DELIVERY_PRICE = 250;
const VAT = 20;

export function calculateOrderPrices(subtotal: number) {
  const vatPrice = (subtotal * VAT) / 100;

  const totalPrice = subtotal + vatPrice + DELIVERY_PRICE;

  return {
    subtotal,
    vatPrice,
    deliveryPrice: DELIVERY_PRICE,
    totalPrice,
  };
}
