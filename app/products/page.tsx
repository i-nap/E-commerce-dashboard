import ProductGrid from "@/components/product-grid";
import SortBar from "@/components/sort-bar";
import FilterBar from "@/components/filter-bar";
import MobileFilterDrawer from "@/components/mobile-filter-drawer";
import Pagination from "@/components/pagination";
import { getAllProducts, getCategories } from "@/services/api/products";
import { ProductPageProps } from "@/types/product";
import { PER_PAGE } from "@/constants/pagination";

export default async function ProductPage({ searchParams }: ProductPageProps) {
    const { sortField, sortOrder, page, minPrice, maxPrice, minRating, category } = await searchParams;
    const currentPage = Math.max(1, Number(page) || 1);

    const [allProductsRaw, categories] = await Promise.all([
        getAllProducts(sortField, sortOrder),
        getCategories(),
    ]);

    const allProducts = allProductsRaw
        .filter(p => !minPrice   || p.price        >= Number(minPrice))
        .filter(p => !maxPrice   || p.price        <= Number(maxPrice))
        .filter(p => !minRating  || p.rating.rate  >= Number(minRating))
        .filter(p => !category   || p.category     === category);

    const totalPages = Math.ceil(allProducts.length / PER_PAGE);
    const products = allProducts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    return (
        <>
            <div className="py-10">
                <div className="flex items-center justify-between gap-3 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <div className="hidden md:flex">
                        <SortBar activeField={sortField} activeOrder={sortOrder} />
                    </div>
                    <div className="flex md:hidden">
                        <MobileFilterDrawer
                            activeField={sortField}
                            activeOrder={sortOrder}
                            activeMinPrice={minPrice}
                            activeMaxPrice={maxPrice}
                            activeMinRating={minRating}
                            activeCategory={category}
                            categories={categories}
                        />
                    </div>
                </div>
                <div className="hidden md:block">
                    <FilterBar
                        activeMinPrice={minPrice}
                        activeMaxPrice={maxPrice}
                        activeMinRating={minRating}
                        activeCategory={category}
                        categories={categories}
                    />
                </div>
                <ProductGrid products={products} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    searchParams={{ sortField, sortOrder, minPrice, maxPrice, minRating, category }}
                />
            </div>
        </>
    )
}