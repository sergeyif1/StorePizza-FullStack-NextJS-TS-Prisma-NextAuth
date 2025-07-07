// import { Button } from "@/components/ui/button"
import { Container, Title, TopBar, Filters } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb=14">
        <div className="flex gap-[100px]">
          {/*Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/*Список товаров*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                categoryId={1}
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 2,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 3,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 4,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 5,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 6,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 7,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 8,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 9,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 10,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                ]}
              />
              <ProductsGroupList
                title="Комбо"
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 2,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 3,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 4,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 5,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 6,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 7,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 8,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 9,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                  {
                    id: 10,
                    name: "Пепперони фреш ",
                    imageUrl: "/1325588gfgfd.jpg",
                    items: [{ price: 160 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
