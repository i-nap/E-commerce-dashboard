import ProductGrid from "@/components/product-grid";
import SortBar from "@/components/sort-bar";
import { getAllProducts } from "@/services/api/products";
import { ProductPageProps } from "@/types/product";

export default async function ProductPage({ searchParams }: ProductPageProps) {
    const { sortField, sortOrder } = await searchParams;
    const products = await getAllProducts(sortField, sortOrder);

    return (
        <>
            <div className="py-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <SortBar activeField={sortField} activeOrder={sortOrder} />
                </div>
                <ProductGrid products={products} />
            </div>
        </>
    )
}