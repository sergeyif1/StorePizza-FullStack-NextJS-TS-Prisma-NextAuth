import { PrismaClient, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { categories, _ingredients, products } from "./constants";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  };
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User",
        email: "user@test.com",
        password: hashSync("11111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin",
        email: "admin@test.com",
        password: hashSync("11111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl: "/1325588gfgfd.jpg",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5).map((item) => ({
          id: item.id,
        })),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Терияки",
      imageUrl: "/tirijaki.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5).map((item) => ({
          id: item.id,
        })),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чесночный цыпленок",
      imageUrl: "/Chesnochiy_Ziplenok.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 3).map((item) => ({
          id: item.id,
        })),
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "Пикантные колбаски",
      imageUrl: "/Pikant_kolbaski.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(2, 4).map((item) => ({
          id: item.id,
        })),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Четыре сыра",
      imageUrl: "/4_cheeses.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 20),
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Ветчина и сыр",
      imageUrl: "/ham_and_chees.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: "Чилл Грилл",
      imageUrl: "/Cheel_Greel.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(15, 30),
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: "Креветка и песто",
      imageUrl: "/Креветка_и_песто.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(20, 40),
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: "Карбонара",
      imageUrl: "/Карбонара.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 30),
      },
    },
  });

  const pizza10 = await prisma.product.create({
    data: {
      name: "Мясная",
      imageUrl: "/Мясная.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 30),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    console.log("✅ Очистка данных прошла успешно.");
    await up();
    console.log("✅ Сидирование завершено успешно.");
  } catch (e) {
    console.error("❌ Ошибка при сидировании:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
