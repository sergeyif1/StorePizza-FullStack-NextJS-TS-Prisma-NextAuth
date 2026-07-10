import { OrderSummary } from "./Order";
import { WayForPayPaymentConfig } from "./WayForPay";

export interface CreateOrderResult {
  order: OrderSummary;
  paymentConfig: WayForPayPaymentConfig;
}
