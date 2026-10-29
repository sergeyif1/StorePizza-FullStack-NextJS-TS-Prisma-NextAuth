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

    await sendEmail(
      data.email,
      `Ваше замовлення №${order.id} прийнято`,
      `
        <h1>Дякуємо за ваше замовлення!</h1>
        <p>Ваше замовлення №${order.id} прийнято і знаходиться в обробці.</p>
      `,
    );

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
      throw new Error("Пользователь не найден");
    }
    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (err) {
    console.log("Error [UPDATE_USER]", err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена");
      }

      throw new Error("Пользователь с такой почтой уже существует");
    }

    const createdUser = prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
        verified: false,
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Pizza / Подтверждение регистрации",
      `
      //   <h1>Подтверждение регистрации</h1>
      //   <p>Ваш код подтверждения: <strong>${code}</strong></p>
      //   <p>Пожалуйста, введите этот код на сайте для завершения регистрации.</p>
      // `,
      // VerificationUserTemplate({ code }),
    );
  } catch (err) {
    console.log("Error [CREATE_USER]", err);
    throw err;
  }
}
