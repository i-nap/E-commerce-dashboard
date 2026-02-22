import { getAllProducts } from "@/services/api/products";

export default async function Home() {
  const products = await getAllProducts();
  console.log(products);

  return (
    <>
    </>
  );
}
