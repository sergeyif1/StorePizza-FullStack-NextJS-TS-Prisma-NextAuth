import { PaymentData } from "@/@types/WayForPay";
import axios from "axios";
import CryptoJS from "crypto-js";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const orderDate = Math.floor(Date.now() / 1000);

  const payload = {
    merchantAccount: "WFP_DOMAIN",
    orderReference: String(details.orderId),
    orderDate,
    amount: details.amount,
    currency: "UAH",

    productName: [details.description],
    productPrice: [details.amount],
    productCount: [1],

    capture: true,

    description: details.description,

    metadata: {
      order_id: details.orderId,
    },
  };

  const signatureString = [
    payload.merchantAccount,
    payload.orderReference,
    payload.orderDate,
    payload.amount,
    payload.currency,
    payload.productName.join(";"),
    payload.productCount.join(";"),
    payload.productPrice.join(";"),
  ].join(";");

  const signature = CryptoJS.HmacMD5(
    signatureString,
    "WFP_SECRET_KEY",
  ).toString();

  const { data } = await axios.post<PaymentData>(
    "https://api.wayforpay.com/api",
    {
      ...payload,
      signature,
    },
  );

  console.log("WAYFORPAY RESPONSE:", JSON.stringify(data, null, 2));

  return data;
}
