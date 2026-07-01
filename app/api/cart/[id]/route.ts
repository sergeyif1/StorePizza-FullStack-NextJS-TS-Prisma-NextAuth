import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, 
) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    // Дожидаемся получения параметров
    const { id: routeId } = await params;
    const id = Number(routeId);

    const data = (await req.json()) as {
      quantity: number;
    };

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }

    await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: data.quantity,
      },
    });

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.error("[CART_PATCH] Server error", error);
    return NextResponse.json(
      { message: "Не удалось обновить корзину" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // Изменено на Promise
) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    // Дожидаемся получения параметров
    const { id: routeId } = await params;
    const id = Number(routeId);

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }

    await prisma.cartItem.delete({
      where: { id },
    });

    const updatedCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("[CART_DELETE] Server error", error);
    return NextResponse.json(
      { message: "Не удалось удалить корзину" },
      { status: 500 },
    );
  }
}

// import { prisma } from "@/prisma/prisma-client";
// import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

// import { NextRequest, NextResponse } from "next/server";

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const token = req.cookies.get("cartToken")?.value;

//     const id = Number(params.id);
//     const data = (await req.json()) as {
//       quantity: number;
//     };

//     if (!token) {
//       return NextResponse.json({ error: " Cart token not found" });
//     }
//     const cartItem = await prisma.cartItem.findFirst({
//       where: {
//         id,
//       },
//     });

//     if (!cartItem) {
//       return NextResponse.json(
//         { error: "Cart item not found" },
//         { status: 404 },
//       );
//     }

//     await prisma.cartItem.update({
//       where: {
//         id,
//       },
//       data: {
//         quantity: data.quantity,
//       },
//     });

//     const updateUserCart = await updateCartTotalAmount(token);

//     return NextResponse.json(updateUserCart);
//   } catch (error) {
//     console.error("[CATH_PATCH] Server error", error);
//     return NextResponse.json(
//       { message: "Не удалось обновить корзину" },
//       { status: 500 },
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const token = req.cookies.get("cartToken")?.value;

//     if (!token) {
//       return NextResponse.json({ error: "Cart token not found" });
//     }

//     const id = Number(params.id);

//     const cartItem = await prisma.cartItem.findFirst({
//       where: { id },
//     });

//     if (!cartItem) {
//       return NextResponse.json(
//         { error: "Cart item not found" },
//         { status: 404 },
//       );
//     }

//     await prisma.cartItem.delete({
//       where: { id },
//     });

//     const updatedCart = await updateCartTotalAmount(token);

//     return NextResponse.json(updatedCart);
//   } catch (error) {
//     console.error("[CATCH_DELETE] Server error", error);
//     return NextResponse.json(
//       { message: "Не удалось удалить корзину" },
//       { status: 500 },
//     );
//   }
// }

// // export async function DELETE(
// //   req: NextRequest,
// //   context: { params: Promise<{ id: string }> },
// // ) {
// //   try {
// //     const { id } = await context.params;
// //     // const id = Number(params.id);
// //     const token = req.cookies.get("cartToken")?.value;

// //     if (!token) {
// //       return NextResponse.json({ error: " Cart token not found" });
// //     }

// //     const cartItem = await prisma.cartItem.findFirst({
// //       where: {
// //         id: Number(params.id),
// //       },
// //     });

// //     if (!cartItem) {
// //       return NextResponse.json(
// //         { error: "Cart item not found" },
// //         { status: 404 },
// //       );
// //     }

// //     await prisma.cartItem.delete({
// //       where: {
// //         id: Number(params.id),
// //       },
// //     });

// //     const updateUserCart = await updateCartTotalAmount(token);
// //     return NextResponse.json(updateUserCart);
// //   } catch (error) {
// //     console.error("[CATH_DELETE] Server error", error);
// //     return NextResponse.json(
// //       { message: "Не удалось удалить корзину" },
// //       { status: 500 },
// //     );
// //   }
// // }
