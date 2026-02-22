import ProductGrid from "@/components/product-grid";
import SortBar from "@/components/sort-bar";
import FilterBar from "@/components/filter-bar";
import Pagination from "@/components/pagination";
import { getAllProducts } from "@/services/api/products";
import { ProductPageProps } from "@/types/product";
import { PER_PAGE } from "@/constants/pagination";

export default async function ProductPage({ searchParams }: ProductPageProps) {
    const { sortField, sortOrder, page, minPrice, maxPrice, minRating } = await searchParams;
    const currentPage = Math.max(1, Number(page) || 1);

    const allProducts = await getAllProducts(
        sortField,
        sortOrder,
        minPrice ? Number(minPrice) : undefined,
        maxPrice ? Number(maxPrice) : undefined,
        minRating ? Number(minRating) : undefined,
    );
    const totalPages = Math.ceil(allProducts.length / PER_PAGE);
    const products = allProducts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    return (
        <>
            <div className="py-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <SortBar activeField={sortField} activeOrder={sortOrder} />
                </div>
                <FilterBar activeMinPrice={minPrice} activeMaxPrice={maxPrice} activeMinRating={minRating} />
                <ProductGrid products={products} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    searchParams={{ sortField, sortOrder, minPrice, maxPrice, minRating }}
                />
            </div>
        </>
    )
}