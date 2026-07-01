export const categories = [
  {
    name: "Пиццы",
  },
  {
    name: "Завтрак",
  },
  {
    name: "Комбо",
  },
  {
    name: "Закуски",
  },
  {
    name: "Коктейли",
  },
  {
    name: "Кофе",
  },
  {
    name: "Напитки",
  },
  {
    name: "Десерты",
  },
];

export const _ingredients = [
  {
    name: "Сырный бортик",
    price: 179,
    imageUrl: "/Сырный бортик.png",
  },
  {
    name: "Сливочная моцарелла",
    price: 79,
    imageUrl: "/Сливочная моцарелла.png",
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 79,
    imageUrl: "/Сыры чеддер и пармезан.png",
  },
  {
    name: "Острый перец халапеньо",
    price: 59,
    imageUrl: "/Острый перец халапеньо.png",
  },
  {
    name: "Нежный цыпленок",
    price: 79,
    imageUrl: "/Нежный цыпленок.png",
  },
  {
    name: "Шампиньоны",
    price: 59,
    imageUrl: "/Шампиньоны.png",
  },
  {
    name: "Ветчина",
    price: 79,
    imageUrl: "/Ветчина.png",
  },
  {
    name: "Пикантная пепперони",
    price: 79,
    imageUrl: "/Пикантная пепперони.png",
  },
  {
    name: "Острая чоризо",
    price: 79,
    imageUrl: "/Острая чоризо.png",
  },
  {
    name: "Маринованные огурчики",
    price: 59,
    imageUrl: "/Маринованные огурчики.png",
  },
  {
    name: "Свежие томаты",
    price: 59,
    imageUrl: "/Свежие томаты.png",
  },
  {
    name: "Красный лук",
    price: 59,
    imageUrl: "/Красный лук.png",
  },
  {
    name: "Сочные ананасы",
    price: 59,
    imageUrl: "/Сочные ананасы.png",
  },
  {
    name: "Итальянские травы",
    price: 39,
    imageUrl: "/Итальянские травы.png",
  },
  {
    name: "Сладкий перец",
    price: 59,
    imageUrl: "/Сладкий перец.png",
  },
  {
    name: "Кубики брынзы",
    price: 79,
    imageUrl: "/Кубики брынзы.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: "Омлет с ветчиной и грибами",
    imageUrl: "/Омлет с ветчиной и грибами.avif",
    categoryId: 2,
  },
  {
    name: "Омлет с пепперони",
    imageUrl: "/Омлет с пепперони.webp",
    categoryId: 2,
  },
  {
    name: "Кофе Латте",
    imageUrl: "/Кофе Латте.webp",
    categoryId: 2,
  },
  {
    name: "Дэнвич ветчина и сыр",
    imageUrl: "/Дэнвич ветчина и сыр.webp",
    categoryId: 3,
  },
  {
    name: "Куриные наггетсы",
    imageUrl: "/Куриные наггетсы.webp",
    categoryId: 3,
  },
  {
    name: "Картофель из печи с соусом",
    imageUrl: "/Картофель из печи с соусом.webp",
    categoryId: 3,
  },
  {
    name: "Додстер",
    imageUrl: "/Додстер.webp",
    categoryId: 3,
  },
  {
    name: "Острый Додстер 🌶️🌶️",
    imageUrl: "/Додстер Чилл Грилл.avif",
    categoryId: 3,
  },
  {
    name: "Банановый молочный коктейль",
    imageUrl: "/Банановый молочный коктейль.webp",
    categoryId: 4,
  },
  {
    name: "Карамельное яблоко молочный коктейль",
    imageUrl: "/Карамельное яблоко молочный коктейль.webp",
    categoryId: 4,
  },
  {
    name: "Молочный коктейль с печеньем Орео",
    imageUrl: "/Молочный коктейль с печеньем Орео.webp",
    categoryId: 4,
  },
  {
    name: "Классический молочный коктейль 👶",
    imageUrl: "/Классический молочный коктейль.webp",
    categoryId: 4,
  },
  {
    name: "Ирландский Капучино",
    imageUrl: "/Ирландский Капучино.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Карамельный капучино",
    imageUrl: "/Кофе Карамельный капучино.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Кокосовый латте",
    imageUrl: "/Кофе Кокосовый латте.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Американо",
    imageUrl: "/Кофе Американо.webp",
    categoryId: 5,
  },
];
