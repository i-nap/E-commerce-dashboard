import ProductGrid from "@/components/product-grid";
import { getAllProducts } from "@/services/api/products";

export default async function ProductPage() {
    const products = await getAllProducts();

    return (
        <>
            <ProductGrid products={products} />
        </>
    )
}