import { OrderEmailData } from "@/@types/Order";

import { calculateOrderPrices } from "./calculate-order";

export function mapOrderToEmail(order: any): OrderEmailData {
  const orderItems = JSON.parse(order.items);

  const items = orderItems.map((item: any) => ({
    name: item.productItem.product.name,

    quantity: item.quantity,

    price: item.productItem.price,

    total: item.productItem.price * item.quantity,
  }));

  const prices = calculateOrderPrices(order.subtotal);

  return {
    orderId: order.id,

    customerName: order.fullName,

    customerEmail: order.email,

    status:
      order.status === "COMPLETED"
        ? "APPROVED"
        : order.status === "PENDING"
          ? "PENDING"
          : "DECLINED",

    paymentLink: "1212------1212",

    items,

    // subtotal: prices.subtotal,
    totalAmount: order.totalAmount,

    vat: prices.vatPrice,

    delivery: prices.deliveryPrice,

    total: prices.totalPrice,
  };
}
