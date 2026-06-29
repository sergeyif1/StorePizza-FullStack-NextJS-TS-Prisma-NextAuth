// =====================
// Common primitives
// =====================

export type Currency = "UAH";

export interface Money {
  value: string;
  currency: Currency;
}

export interface Recipient {
  account_id: string;
  gateway_id: string;
}

export interface Confirmation {
  type: string;
  confirmation_url: string;
}

export interface Metadata {
  order_id: string;
}

// =====================
// Payment status model
// =====================

export type PaymentStatus = "Approved" | "Pending" | "Declined" | "Refund";

// =====================
// Payment (API response)
// =====================

export interface PaymentData {
  id: string;
  status: PaymentStatus;
  amount: Money;
  description: string;

  recipient: Recipient;

  created_at: string;

  confirmation: Confirmation;

  test: boolean;
  paid: boolean;

  refundable: boolean;

  metadata: Metadata;
}

// =====================
// Callback types
// =====================

export type CallbackEvent =
  | "Approved"
  | "Pending"
  | "Declined"
  | "Refund"
  | "Check status";

export type PaymentCallbackData = {
  type: string;
  event: CallbackEvent;

  object: PaymentObject;
};

// =====================
// Callback object
// =====================

export interface PaymentObject {
  id: string;
  status: PaymentStatus;

  amount: Money;

  income_amount: Money;

  description: string;

  recipient: Recipient;

  payment_method: PaymentMethod;

  captured_at: string;
  created_at: string;

  test: boolean;

  refunded_amount: Money;

  paid: boolean;

  refundable: boolean;

  metadata: Metadata;

  authorization_details: AuthorizationDetails;
}

// =====================
// Nested objects
// =====================

export interface PaymentMethod {
  type: string;
  id: string;
  saved: boolean;
  title: string;
}

export interface AuthorizationDetails {
  rrn: string;
  auth_code: string;
}
