import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { PaymentCallbackData } from "@/@types/WayForPay";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    // console.log("[WayForPay] Callback:", JSON.stringify(body, null, 2));

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

    // =====================================
    // TODO:
    // Проверка merchantSignature
    // =====================================

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
        // // console.warn(
        //   `[WayForPay] Unknown transactionStatus: ${body.transactionStatus}`,
        // );

        return NextResponse.json(
          {
            error: "Unknown transaction status",
          },
          {
            status: 400,
          },
        );
    }

    // console.log("[WayForPay] BEFORE UPDATE", {
    //   orderId: order.id,
    //   oldStatus: order.status,
    //   newStatus,
    // });

    // =====================================
    // Идемпотентность
    // =====================================

    if (order.status === newStatus) {
      // console.log(
      //   `[WayForPay] Order ${order.id} already has status ${order.status}`,
      // );

      return NextResponse.json({
        ok: true,
      });
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: newStatus,

        // Позже заменить на transactionId,
        // если WayForPay его предоставляет.
        paymentId: body.authCode || null,
      },
    });

    // const updatedOrder = await prisma.order.findUnique({
    //   where: {
    //     id: order.id,
    //   },
    // });

    // console.log("[WayForPay] AFTER UPDATE", updatedOrder);

    // console.log(`[WayForPay] Order ${order.id} → ${updatedOrder?.status}`);

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
