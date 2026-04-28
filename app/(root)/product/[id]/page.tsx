import {
  Container,
  ProductImage,
  Title,
} from "@/shared/components/shared/index";
import { GroupVariats } from "@/shared/components/shared/group-variats";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const productId = parseInt(id, 10);

  if (isNaN(productId) || productId <= 0) {
    return notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={40} />

        <div className="w-[490px] bg-[#f3f2f1] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />

          <p className="text-gray-400">lorem ipsum dolor</p>

          <GroupVariats
            value="2"
            items={[
              { name: "Маленькая", value: "1" },
              { name: "Средняя", value: "2" },
              { name: "Большая", value: "3", disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
