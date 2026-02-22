"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Product, SortField, SortOrder } from "@/types/product";
import { PER_PAGE } from "@/constants/pagination";
import { sortOptions } from "@/constants/sort-options";
import ProductGrid from "@/components/product-grid";
import SortBar from "@/components/sort-bar";
import FilterBar from "@/components/filter-bar";
import MobileFilterDrawer from "@/components/mobile-filter-drawer";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";

interface ProductListProps {
    allProducts: Product[];
    categories: string[];
}

export default function ProductList({ allProducts, categories }: ProductListProps) {
    const searchParams = useSearchParams();

    const sortField = searchParams.get("sortField") as SortField | null ?? undefined;
    const sortOrder = searchParams.get("sortOrder") as SortOrder | null ?? undefined;
    const page      = searchParams.get("page") ?? "1";
    const minPrice  = searchParams.get("minPrice") ?? undefined;
    const maxPrice  = searchParams.get("maxPrice") ?? undefined;
    const minRating = searchParams.get("minRating") ?? undefined;
    const category  = searchParams.get("category") ?? undefined;
    const search    = searchParams.get("search") ?? undefined;

    const currentPage = Math.max(1, Number(page) || 1);

    const filtered = useMemo(() => {
        let products = [...allProducts];

        if (minPrice)  products = products.filter(p => p.price >= Number(minPrice));
        if (maxPrice)  products = products.filter(p => p.price <= Number(maxPrice));
        if (minRating) products = products.filter(p => p.rating.rate >= Number(minRating));
        if (category)  products = products.filter(p => p.category === category);
        if (search)    products = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

        if (sortField) {
            const opt = sortOptions.find(o => o.field === sortField);
            if (opt) {
                products.sort((a, b) => {
                    const aVal = sortField === "rating" ? a.rating.rate : a[sortField];
                    const bVal = sortField === "rating" ? b.rating.rate : b[sortField];
                    const order = sortOrder === "asc" ? 1 : -1;
                    return typeof aVal === "string"
                        ? aVal.localeCompare(bVal as string) * order
                        : ((aVal as number) - (bVal as number)) * order;
                });
            }
        }

        return products;
    }, [allProducts, minPrice, maxPrice, minRating, category, search, sortField, sortOrder]);

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const products   = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    const searchParamsRecord = { sortField, sortOrder, minPrice, maxPrice, minRating, category, search };

    return (
        <div className="py-10">
            <div className="flex items-center justify-between gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <div className="hidden md:flex flex-1 max-w-sm">
                    <SearchBar key={search} activeSearch={search} />
                </div>
                <div className="flex md:hidden">
                    <MobileFilterDrawer
                        activeField={sortField}
                        activeOrder={sortOrder}
                        activeMinPrice={minPrice}
                        activeMaxPrice={maxPrice}
                        activeMinRating={minRating}
                        activeCategory={category}
                        activeSearch={search}
                        categories={categories}
                    />
                </div>
            </div>

            <div className="hidden md:flex">
                <SortBar activeField={sortField} activeOrder={sortOrder} />
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
                searchParams={searchParamsRecord}
            />
        </div>
    );
}
