// ================================
// Payment lifecycle status
// ================================

// export type PaymentStatus = "PENDING" | "PAID" | "DECLINED";
export type PaymentStatus = "Approved" | "Declined" | "Pending";

// ================================
// Widget config
// Данные для wayforpay.run()
// Server -> React -> Widget
// ================================

export interface WayForPayPaymentConfig {
  merchantAccount: string;
  merchantDomainName: string;

  merchantAuthType: "SimpleSignature";
  merchantTransactionType: "SALE";
  merchantTransactionSecureType: "AUTO";

  merchantSignature: string;

  orderReference: string;
  orderDate: number;

  amount: number;
  currency: "UAH";

  productName: string[];
  productPrice: string[];
  productCount: string[];

  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;

  language: "UA";

  serviceUrl?: string;
}

// ================================
// Widget response
// Ответ внутри браузера
// wayforpay.run()
// ================================

// export interface WayForPayPaymentResult {
//   merchantAccount: string;

//   merchantSignature: string;

//   orderReference: string;

//   amount: number;

//   currency: "UAH";

//   authCode: string;

//   transactionStatus: "Approved" | "Declined" | "Pending";

//   reason: string;

//   reasonCode: number;

//   createdDate: number;

//   processingDate: number;

//   cardPan?: string;

//   cardType?: string;

//   email?: string;

//   phone?: string;

//   paymentSystem?: string;

//   fee?: number;
// }

export interface WayForPayPaymentResult {
  merchantAccount: string;
  merchantSignature: string;

  orderReference: string;

  amount: number;
  currency: string;

  transactionStatus: PaymentStatus;

  reason?: string;
  reasonCode?: number;

  authCode?: string;

  cardPan?: string;
  cardType?: string;

  email?: string;
  phone?: string;
}

// ================================
// Server callback
// WayForPay -> Next.js API route
// /api/payment/callback
// ================================

export interface PaymentCallbackData {
  merchantAccount: string;

  orderReference: string;

  merchantSignature: string;

  amount: number;

  currency: string;

  transactionStatus: PaymentStatus;

  authCode?: string;

  email?: string;

  phone?: string;

  createdDate?: number;

  processingDate?: number;

  reason?: string;

  reasonCode?: number;

  cardPan?: string;

  cardType?: string;
}

// export interface PaymentCallbackData {
//   merchantAccount: string;

//   merchantSignature: string;

//   orderReference: string;

//   amount: number;

//   currency: "UAH";

//   authCode: string;

//   transactionStatus: "Approved" | "Declined" | "Pending";

//   reason: string;

//   reasonCode: number;

//   createdDate: number;

//   processingDate: number;

//   cardPan?: string;

//   cardType?: string;

//   email?: string;

//   phone?: string;

//   paymentSystem?: string;

//   fee?: number;

//   issuerBankCountry?: string;

//   issuerBankName?: string;

//   recToken?: string;
// }
