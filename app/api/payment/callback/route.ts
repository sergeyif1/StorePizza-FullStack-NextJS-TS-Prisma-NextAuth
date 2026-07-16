import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { PaymentCallbackData } from "@/@types/WayForPay";
import { sendEmail } from "@/shared/lib";
import { PayOrderTemplate } from "@/shared/components/shared/email-temapltes/pay-order";
import { mapOrderToEmail } from "@/shared/lib/order/map-order-to-email";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const orderId = Number(body.orderReference);

    if (!orderId) {
      return NextResponse.json(
        {
          error: "Invalid orderReference",
        },
        {
          status: 400,
        },
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          error: "Order not found",
        },
        {
          status: 404,
        },
      );
    }

    let newStatus: OrderStatus;

    switch (body.transactionStatus) {
      case "Approved":
        newStatus = OrderStatus.COMPLETED;
        break;

      case "Declined":
        newStatus = OrderStatus.CANCELLED;
        break;

      case "Pending":
        newStatus = OrderStatus.PENDING;
        break;

      default:
        return NextResponse.json(
          {
            error: "Unknown transaction status",
          },
          {
            status: 400,
          },
        );
    }

    // =====================================
    // Защита от повторного COMPLETED
    // =====================================

    if (
      order.status === OrderStatus.COMPLETED &&
      newStatus === OrderStatus.COMPLETED
    ) {
      return NextResponse.json({
        ok: true,
      });
    }

    // =====================================
    // Update Order
    // =====================================

    const updatedOrder = await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        status: newStatus,
        paymentId: body.authCode || null,
      },
    });

    // =====================================
    // Email
    // =====================================

    if (order.status !== newStatus) {
      const emailData = mapOrderToEmail(updatedOrder);

      await sendEmail(
        updatedOrder.email,
        `Next Pizza / Замовлення №${updatedOrder.id}`,
        React.createElement(PayOrderTemplate, {
          data: emailData,
        }),
      );
    }

    console.log(`[Payment] Order ${updatedOrder.id} → ${updatedOrder.status}`);

    return NextResponse.json({
      ok: true,
    });
  } catch (err) {
    console.error("[Payment Callback Error]", err);

    return NextResponse.json(
      {
        error: "Internal error",
      },
      {
        status: 500,
      },
    );
  }
}
