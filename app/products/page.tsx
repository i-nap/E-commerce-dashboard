import { getAllProducts, getCategories } from "@/services/api/products";
import ProductList from "@/components/product-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'All Products',
  alternates: {
    canonical: '/products',
  },
};
export const dynamic = "force-dynamic";
export default async function ProductPage() {
    const [allProducts, categories] = await Promise.all([
        getAllProducts(),
        getCategories(),
    ]);


    return <ProductList allProducts={allProducts} categories={categories} />;
}