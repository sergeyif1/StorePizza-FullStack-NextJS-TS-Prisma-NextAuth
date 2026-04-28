import { prisma } from "@/prisma/prisma-client";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";

import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ items: [], totalAmount: 0 });
    }

    const userCart = await prisma.cart.findFirst({
      where: { token },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error("[CART_GET] Server error:", error);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const ingredients = data.ingredients ?? [];
    const ingredientsSorted = [...ingredients].sort((a, b) => a - b);

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    const isSameIngredients =
      findCartItem &&
      findCartItem.ingredients.length === ingredientsSorted.length &&
      findCartItem.ingredients.every((i) => ingredientsSorted.includes(i.id));

    if (findCartItem && isSameIngredients) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: ingredients.map((id) => ({ id })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token);

    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 },
    );
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     let token = req.cookies.get("cartToken")?.value;

//     if (!token) {
//       token = crypto.randomUUID();
//     }

//     const userCart = await findOrCreateCart(token);

//     const data = (await req.json()) as CreateCartItemValues;

//     // 🔥 ВАЖНО: нормализуем ингредиенты
//     const ingredients = data.ingredients ?? [];
//     const ingredientsSorted = [...ingredients].sort();

//     const findCartItem = await prisma.cartItem.findFirst({
//       where: {
//         cartId: userCart.id,
//         productItemId: data.productItemId,
//       },
//       include: {
//         ingredients: true,
//       },
//     });

//     // 🔥 сравнение вручную (правильно)
//     const isSameIngredients =
//       findCartItem &&
//       findCartItem.ingredients.length === ingredientsSorted.length &&
//       findCartItem.ingredients.every((i) => ingredientsSorted.includes(i.id));

//     if (findCartItem && isSameIngredients) {
//       await prisma.cartItem.update({
//         where: {
//           id: findCartItem.id,
//         },
//         data: {
//           quantity: findCartItem.quantity + 1,
//         },
//       });
//     } else {
//       await prisma.cartItem.create({
//         data: {
//           cartId: userCart.id,
//           productItemId: data.productItemId,
//           quantity: 1,
//           ingredients: {
//             connect: ingredientsSorted.map((id) => ({ id })),
//           },
//         },
//       });
//     }

//     const updatedUserCart = await updateCartTotalAmount(token);

//     const resp = NextResponse.json(updatedUserCart);
//     resp.cookies.set("cartToken", token);

//     return resp;
//   } catch (error) {
//     console.log("[CART_POST] Server error", error);
//     return NextResponse.json(
//       { message: "Не удалось создать корзину" },
//       { status: 500 },
//     );
//   }
// }

// import { prisma } from "@/prisma/prisma-client";

// import { NextResponse, NextRequest } from "next/server";

// import crypto from "crypto";

// import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
// import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
// import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get("cartToken")?.value;

//     if (!token) {
//       // token = crypto.randomUUID();
//       return NextResponse.json({ items: [], totalAmount: 0 });
//     }

//     const userCart = await prisma.cart.findFirst({
//       where: { token },
//       include: {
//         items: {
//           orderBy: {
//             createdAt: "desc",
//           },
//           include: {e
//             productItem: {
//               include: {
//                 product: true,
//               },
//             },
//             // ingredients: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(userCart);

//   } catch (error) {
//     console.error("[CART_GET] Server error:", error);
//     return NextResponse.json(
//       { message: "Не удалось получить корзину" },
//       { status: 500 },
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     let token = req.cookies.get("cartToken")?.value;

//     if (!token) {
//       token = crypto.randomUUID();
//     }

//     const userCart = await findOrCreateCart(token);

//     const data = (await req.json()) as CreateCartItemValues;

//     const findCartItem = await prisma.cartItem.findFirst({
//       where: {
//         cartId: userCart.id,
//         productItemId: data.productItemId,
//         Ingredient: data.ingredients?.length
//           ? {
//               some: {
//                 id: { in: data.ingredients },
//               },
//             }
//           : undefined,
//       },
//     });

//     // Если товар был найден, делаем +1
//     if (findCartItem) {
//       await prisma.cartItem.update({
//         where: {
//           id: findCartItem.id,
//         },
//         data: {
//           quantity: findCartItem.quantity + 1,
//         },
//       });
//     } else {
//           await prisma.cartItem.create({
//             data: {
//               cartId: userCart.id,
//               productItemId: data.productItemId,
//               quantity: 1,
//               ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
//             },
//           });
//     }

//     const updatedUserCart = await updateCartTotalAmount(token);

//     const resp = NextResponse.json(updatedUserCart);
//     resp.cookies.set("cartToken", token);
//     return resp;
//   } catch (error) {
//     console.log("[CART_POST] Server error", error);
//     return NextResponse.json(
//       { message: "Не удалось создать корзину" },
//       { status: 500 },
//     );
//   }
// }

// else {
//     await prisma.cartItem.create({
//       data: {
//         cartId: userCart.id,
//         productItemId: data.productItemId,
//         quantity: 1,
//         ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
//       },
//     });
//   }

// const userCart = await findOrCreateCart(token);

//   const findCartItem = await prisma.cartItem.findFirst({
//     where: {
//       cartId: userCart.id,
//       productItemId: data.productItemId,
//       ingredients: {
//         every: { id: { in: data.ingredients } },
//       },
//     },
//   });

//   // Если товар был найден, делаем +1
//   if (findCartItem) {
//     await prisma.cartItem.update({
//       where: {
//         id: findCartItem.id,
//       },
//       data: {
//         quantity: findCartItem.quantity + 1,
//       },
//     });
//   }

//   await prisma.cartItem.create({
//     data: {
//       cartId: userCart.id,
//       productItemId: data.productItemId,
//       quantity: 1,
//       ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
//     },
//   });

//   const updatedUserCart = await updateCartTotalAmount(token);
//   const resp = NextResponse.json(updatedUserCart);
//   resp.cookies.set("cartToken", token);
//   return resp;

// const userCart = await prisma.cart.findFirst({
//   where: {
//     token,
//   },
//   include: {
//     items: {
//       orderBy: {
//         createdAt: "desc",
//       },
//     },
//   },
// });
