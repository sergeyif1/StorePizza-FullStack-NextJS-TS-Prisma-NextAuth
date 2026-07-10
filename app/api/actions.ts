"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from "@/shared/lib";
import { PayOrderTemplate } from "@/shared/components/shared/email-temapltes/pay-order";
import { CreateOrderResult } from "@/@types/Checkout";

export async function createOrder(
  data: CheckoutFormValues,
): Promise<CreateOrderResult> {
  try {
    // =====================
    // 1. Cookies
    // =====================

    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    // =====================
    // 2. Cart
    // =====================

    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    // =====================
    // 3. Create order
    // =====================

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // =====================
    // 4. Clear cart
    // =====================

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // =====================
    // 5. Build payment config
    // =====================

    const paymentConfig = createPayment({
      orderId: order.id,
      amount: order.totalAmount,
      description: `Оплата замовлення №${order.id}`,

      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,

      address: data.address,
      comment: data.comment,
    });

    // =====================
    // 6. Email (не должен ломать заказ)
    // =====================

    try {
      await sendEmail(
        data.email,
        `Next Pizza / Замовлення №${order.id}`,
        PayOrderTemplate({
          orderId: order.id,
          totalAmount: order.totalAmount,
          paymentUrl: "",
        }),
      );
    } catch (error) {
      console.error("[CreateOrder] Email error", error);
    }

    // =====================
    // 7. Return
    // =====================

    return {
      order: {
        id: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
      },
      paymentConfig,
    };
  } catch (err) {
    console.error("[CreateOrder] Server error", err);
    throw err;
  }
}
