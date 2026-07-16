import React from "react";
import { OrderEmailData } from "@/@types/Order";
import { calculateOrderPrices } from "@/shared/lib/order/calculate-order";

interface Props {
  data: OrderEmailData;
}

export const PayOrderTemplate: React.FC<Props> = ({ data }) => {
  const isApproved = data.status === "APPROVED";

  const prices = calculateOrderPrices(data.totalAmount);

  const Divider = () => (
    <p
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#777",
        letterSpacing: "2px",
        margin: "20px 0",
      }}>
      *******************************
    </p>
  );

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "620px",
        margin: "0 auto",
        padding: "30px",
        background: "#ffffff",
      }}>
      <h1>
        {isApproved ? "✅ Оплату успішно виконано." : "❌ Оплату не завершено."}
      </h1>

      {isApproved ? (
        <>
          <p>Дякуємо за ваше замовлення!</p>

          <p className="mt-3">Ми вже почали його обробку.</p>

          <p className="mt-3">Це ваш чек.</p>
        </>
      ) : (
        <>
          <p>Ваше замовлення збережено.</p>

          <p className="mt-3">Ви можете повернутися до оплати</p>

          <p className="mt-3">пізніше в особистому кабінеті.</p>

          <p className="mt-3">Це може бути ваш чек.</p>

          {data.paymentLink && (
            <a
              href={data.paymentLink}
              style={{
                display: "inline-block",
                padding: "12px 20px",
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "8px",
              }}>
              Перейти до оплати
            </a>
          )}
        </>
      )}

      <Divider />

      <h2>Ваше замовлення №{data.orderId}</h2>

      {data.items.map((item, index) => (
        <div key={index}>
          <p>🍕 {item.name}</p>

          <p>
            {item.quantity} шт.
            {" — "}
            {item.total} грн.
          </p>
        </div>
      ))}

      <Divider />

      <p>
        {/* Вартість замовлення: {prices.subtotal} */}
        Вартість замовлення: {data.totalAmount.toFixed(2)}
        {" грн."}
      </p>

      <p>
        ПДВ 20%: {prices.vatPrice.toFixed(2)}
        {" грн."}
      </p>

      <p>
        Вартість доставки: {prices.deliveryPrice}
        {" грн."}
      </p>

      <Divider />

      <h2>
        Разом: {prices.totalPrice.toFixed(2)}
        {" грн."}
      </h2>
    </div>
  );
};
