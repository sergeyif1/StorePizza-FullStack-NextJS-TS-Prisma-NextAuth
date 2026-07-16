import { WayForPayPaymentConfig } from "@/@types/WayForPay";
import CryptoJS from "crypto-js";
import { calculateOrderPrices } from "./order/calculate-order";

// =====================
// Types
// =====================

interface CreatePaymentProps {
  orderId: number;
  subtotal: number;
  description: string;

  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

// =====================
// Payment builder
// =====================

export function createPayment(
  details: CreatePaymentProps,
): WayForPayPaymentConfig {
  const merchantAccount = process.env.WFP_MERCHANT_ACCOUNT;
  const merchantDomainName = process.env.NEXT_PUBLIC_APP_URL;
  const secretKey = process.env.WFP_SECRET_KEY;

  if (!merchantAccount || !merchantDomainName || !secretKey) {
    throw new Error("WayForPay environment variables are not configured");
  }

  const orderDate = Math.floor(Date.now() / 1000);

  const prices = calculateOrderPrices(details.subtotal);

  const payload = {
    merchantAccount,
    merchantDomainName,

    merchantAuthType: "SimpleSignature" as const,
    merchantTransactionType: "SALE" as const,
    merchantTransactionSecureType: "AUTO" as const,

    orderReference: String(details.orderId),
    orderDate,

    amount: prices.totalPrice,
    currency: "UAH" as const,

    productName: [details.description],
    productPrice: [String(prices.totalPrice)],
    productCount: ["1"],

    // =====================
    // Customer
    // =====================

    clientFirstName: details.firstName,
    clientLastName: details.lastName,
    clientEmail: details.email,
    clientPhone: details.phone,

    // =====================
    // Widget
    // =====================

    language: "UA" as const,

    // Будут подключены позже
    // returnUrl: process.env.WFP_RETURN_URL,
    serviceUrl: process.env.WFP_SERVICE_URL,
  };

  // =====================
  // Signature
  // =====================

  const signatureString = [
    payload.merchantAccount,
    payload.merchantDomainName,
    payload.orderReference,
    payload.orderDate,
    payload.amount,
    payload.currency,
    payload.productName.join(";"),
    payload.productCount.join(";"),
    payload.productPrice.join(";"),
  ].join(";");

  const merchantSignature = CryptoJS.HmacMD5(
    signatureString,
    secretKey,
  ).toString();

  // =====================
  // Widget configuration
  // =====================

  return {
    ...payload,
    merchantSignature,
  };
}
