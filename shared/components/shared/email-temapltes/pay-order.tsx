import React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Замовлення #{orderId}</h1>

    <p>
      Оплатіть замовлення по суммі <b>{totalAmount} ₴</b>. Перейдіть{" "}
      <a href={paymentUrl}>по цій ссилці</a> для оплаты замовлення.
    </p>
  </div>
);
