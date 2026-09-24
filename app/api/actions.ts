"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from "@/shared/lib";
import { CreateOrderResult } from "@/@types/Checkout";
import { hashSync } from "bcrypt";
import { getUserSession } from "@/shared/lib/get-user-session";

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

    console.log("=== ORDER CREATED ===");
    console.log("DB order.id:", order.id);
    console.log("DB order.status:", order.status);

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
      subtotal: order.totalAmount,
      description: `Оплата замовлення №${order.id}`,

      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,

      // address: data.address,
      // comment: data.comment,
    });

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

export async function updateUserInfo(body: Prisma.UserCreateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Пщльзователь не найден");
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });
  } catch (err) {
    console.log("Error [UPDATE_USER]", err);
    throw err;
  }
}