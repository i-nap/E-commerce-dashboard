import { getAllProducts, getCategories } from "@/services/api/products";
import ProductList from "@/components/product-list";

export default async function ProductPage() {
    const [allProducts, categories] = await Promise.all([
        getAllProducts(),
        getCategories(),
    ]);


    return <ProductList allProducts={allProducts} categories={categories} />;
}