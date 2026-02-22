"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FilterBarProps } from "@/types/product";
import { SlidersHorizontalIcon, XIcon, TagIcon, StarIcon } from "lucide-react";
import { RATING_OPTIONS } from "@/constants/filter-options";
import Button from "./button";
import { buildFilterParams } from "@/lib/filter-params";

export default function FilterBar({ activeMinPrice, activeMaxPrice, activeMinRating, activeCategory, categories }: FilterBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minInput, setMinInput] = useState(activeMinPrice ?? "");
    const [maxInput, setMaxInput] = useState(activeMaxPrice ?? "");
    const [priceOpen, setPriceOpen] = useState(!!(activeMinPrice || activeMaxPrice));

    const hasActiveFilters = !!(activeMinPrice || activeMaxPrice || activeMinRating || activeCategory);

    const updateParams = (updates: Record<string, string | null>) => {
        router.push(buildFilterParams(searchParams, updates));
    };

    const applyPriceRange = () => {
        updateParams({ minPrice: minInput || null, maxPrice: maxInput || null });
    };

    const clearPrice = () => {
        setMinInput("");
        setMaxInput("");
        setPriceOpen(false);
        updateParams({ minPrice: null, maxPrice: null });
    };

    const handleRating = (value: string) => {
        updateParams({ minRating: activeMinRating === value ? null : value });
    };

    const clearAll = () => {
        setMinInput("");
        setMaxInput("");
        setPriceOpen(false);
        updateParams({ minPrice: null, maxPrice: null, minRating: null, category: null, search: null });
    };

    return (
        <div className="flex flex-col gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2 py-3 border-y border-gray-100">
                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500 shrink-0">
                    <SlidersHorizontalIcon className="w-4 h-4" />
                    Filter
                </span>

                <Button
                    variant={priceOpen || activeMinPrice || activeMaxPrice ? "filter-active" : "filter"}
                    size="sm"
                    onClick={() => setPriceOpen(o => !o)}
                    className="flex items-center gap-1.5"
                >
                    <TagIcon className="w-3.5 h-3.5" />
                    Price range
                    {(activeMinPrice || activeMaxPrice) && (
                        <span className="ml-1 text-xs opacity-80">
                            {activeMinPrice ? `$${activeMinPrice}` : ""}
                            {activeMinPrice && activeMaxPrice ? " – " : ""}
                            {activeMaxPrice ? `$${activeMaxPrice}` : ""}
                        </span>
                    )}
                </Button>

                <div className="w-px h-5 bg-gray-200" />

                <div className="flex flex-wrap items-center gap-2">
                    <StarIcon className="w-3.5 h-3.5 fill-gray-300 text-gray-300 shrink-0" />
                    {RATING_OPTIONS.map((opt) => {
                        const isActive = activeMinRating === opt.value;
                        return (
                            <Button
                                key={opt.value}
                                variant={isActive ? "filter-active" : "filter"}
                                size="sm"
                                onClick={() => handleRating(opt.value)}
                            >
                                {opt.label} ★
                            </Button>
                        );
                    })}
                </div>

                <div className="w-px h-5 bg-gray-200" />

                <div className="flex flex-wrap items-center gap-2">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <Button
                                key={cat}
                                variant={isActive ? "filter-active" : "filter"}
                                size="sm"
                                onClick={() => updateParams({ category: isActive ? null : cat })}
                                className="capitalize"
                            >
                                {cat}
                            </Button>
                        );
                    })}
                </div>

                {hasActiveFilters && (
                    <Button
                        variant="filter"
                        size="sm"
                        onClick={clearAll}
                        className="flex items-center gap-1 ml-auto"
                    >
                        <XIcon className="w-3.5 h-3.5" />
                        Clear
                    </Button>
                )}
            </div>

            {priceOpen && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-1">
                    <span className="text-sm text-gray-500 font-medium shrink-0">Price range</span>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                                type="number"
                                min={0}
                                placeholder="Min"
                                value={minInput}
                                onChange={e => setMinInput(e.target.value)}
                                className="w-24 pl-6 pr-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-primary"
                            />
                        </div>
                        <span className="text-gray-400">–</span>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                                type="number"
                                min={0}
                                placeholder="Max"
                                value={maxInput}
                                onChange={e => setMaxInput(e.target.value)}
                                className="w-24 pl-6 pr-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-primary"
                            />
                        </div>
                        <Button variant="primary" size="sm" onClick={applyPriceRange}>
                            Apply
                        </Button>
                        {(activeMinPrice || activeMaxPrice) && (
                            <Button variant="filter" size="sm" onClick={clearPrice}>
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
