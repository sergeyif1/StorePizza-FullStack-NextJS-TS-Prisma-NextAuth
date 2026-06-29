import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string | string[];
  pizzaTypes?: string | string[];
  ingredients?: string | string[];
  priceFrom?: string;
  priceTo?: string;
}

const parseArrayParam = (param: unknown): number[] => {
  if (!param) return [];

  if (Array.isArray(param)) {
    return param.map(Number).filter(Number.isFinite);
  }

  if (typeof param === "string") {
    return param.split(",").map(Number).filter(Number.isFinite);
  }

  return [];
};

const checkPrice = (
  price: number,
  minPrice: number | null,
  maxPrice: number | null,
) => {
  if (minPrice !== null && maxPrice !== null) {
    return price >= minPrice && price <= maxPrice; // коридор
  }

  if (minPrice !== null) {
    return price >= minPrice; // только снизу
  }

  if (maxPrice !== null) {
    return price <= maxPrice; // только сверху
  }

  return true;
};

export const findPizzas = async (params: GetSearchParams) => {
  const rawSizes = params.sizes ?? (params as any)["sizes[]"];
  const rawPizzaTypes = params.pizzaTypes ?? (params as any)["pizzaTypes[]"];
  const rawIngredients = params.ingredients ?? (params as any)["ingredients[]"];

  const sizes = parseArrayParam(rawSizes);
  const pizzaTypes = parseArrayParam(rawPizzaTypes);
  const ingredientsIdArr = parseArrayParam(rawIngredients);

  // 🔥 ИЗМЕНЕНО: null вместо дефолтов
  const minPrice = params.priceFrom ? Number(params.priceFrom) : null;
  const maxPrice = params.priceTo ? Number(params.priceTo) : null;

  console.log("=== FILTER PARAMS ===", {
    sizes,
    pizzaTypes,
    ingredientsIdArr,
    minPrice,
    maxPrice,
  });

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: { id: "desc" },
        include: {
          ingredients: true,
          items: true, // 🔥 ИЗМЕНЕНО: убрали orderBy
        },
      },
    },
  });

  return categories
    .map((category) => {
      const products = category.products
        .map((product) => {
          const matchIngredients =
            ingredientsIdArr.length === 0 ||
            product.ingredients.some((i) => ingredientsIdArr.includes(i.id));

          if (!matchIngredients) return null;

          // 🔥 ГЛАВНОЕ: фильтрация items
          const validItems = product.items.filter((item) => {
            const sizeOk =
              sizes.length === 0 ||
              (item.size !== null && sizes.includes(item.size));

            const typeOk =
              pizzaTypes.length === 0 ||
              (item.pizzaType !== null && pizzaTypes.includes(item.pizzaType));

            const priceOk = checkPrice(item.price, minPrice, maxPrice);

            return sizeOk && typeOk && priceOk;
          });

          // 🔥 если ни один item не подошёл — товар не показываем
          if (validItems.length === 0) return null;

          // 🔥 ИЗМЕНЕНО: выбираем МИНИМАЛЬНЫЙ из подходящих
          const bestItem = validItems.reduce((min, item) =>
            item.price < min.price ? item : min,
          );

          // ❌ УДАЛЕНО: finalPriceOk (он больше не нужен)

          return {
            ...product,
            price: bestItem.price,
            item: bestItem,
          };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null);

      console.log(
        "Category:",
        category.name,
        "\nProduct IDs:",
        products.map((p) => p.id),
      );

      return {
        ...category,
        products,
      };
    })
    .filter((c) => c.products.length > 0);
};

// import { prisma } from "@/prisma/prisma-client";

// export interface GetSearchParams {
//   query?: string;
//   sortBy?: string;
//   sizes?: string;
//   pizzaTypes?: string;
//   ingredients?: string;
//   priceFrom?: string;
//   priceTo?: string;
// }

// const DEFAULT_MIN_PRICE = 0;
// const DEFAULT_MAX_PRICE = 2000;

// export const findPizzas = async (params: GetSearchParams) => {
//   const sizes = params.sizes?.split(",").map(Number).filter(Boolean);
//   const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
//   const ingredientsIdArr = params.ingredients?.split(",").map(Number);

// const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
// const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

//   const categories = await prisma.category.findMany({
//     include: {
//       products: {
//         orderBy: {
//           id: "desc",
//         },
//         where: {
//           ingredients:
//             ingredientsIdArr && ingredientsIdArr.length > 0
//               ? {
//                   some: {
//                     id: {
//                       in: ingredientsIdArr,
//                     },
//                   },
//                 }
//               : undefined,
//           items: {
//             some: {
//               ...(sizes &&
//                 sizes.length > 0 && {
//                   size: {
//                     in: sizes,
//                   },
//                 }),
//               ...(pizzaTypes &&
//                 pizzaTypes.length > 0 && {
//                   pizzaType: {
//                     in: pizzaTypes,
//                   },
//                 }),
//               price: {
//                 gte: minPrice,
//                 lte: maxPrice,
//               },
//             },
//           },
//         },
//         include: {
//           ingredients: true,
//           items: {
//             orderBy: {
//               price: "asc",
//             },
//           },
//         },
//       },
//     },
//   });

//   return categories;
// };
