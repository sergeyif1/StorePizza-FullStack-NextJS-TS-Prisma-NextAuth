export interface OrderSummary {
  id: number;
  totalAmount: number;
  status: string;
}

export interface OrderEmailItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderEmailData {
  orderId: number;

  customerName: string;
  customerEmail: string;

  status: "APPROVED" | "DECLINED" | "PENDING";

  paymentLink: string;

  items: OrderEmailItem[];

  // subtotal: number;
  totalAmount: number;

  delivery: number;

  vat: number;

  total: number;
}
