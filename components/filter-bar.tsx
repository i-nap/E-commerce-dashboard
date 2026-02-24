"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FilterBarProps } from "@/types/product";
import { SlidersHorizontalIcon, XIcon, TagIcon, StarIcon, ChevronDownIcon, LayoutGridIcon } from "lucide-react";
import { RATING_OPTIONS } from "@/constants/filter-options";
import Button from "./button";
import { buildFilterParams } from "@/lib/filter-params";

export default function FilterBar({ activeMinPrice, activeMaxPrice, activeMinRating, activeCategory, categories }: FilterBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minInput, setMinInput] = useState(activeMinPrice ?? "");
    const [maxInput, setMaxInput] = useState(activeMaxPrice ?? "");
    const [priceOpen, setPriceOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);

    const categoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
                setCategoryOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const hasActiveFilters = !!(activeMinPrice || activeMaxPrice || activeMinRating || activeCategory);

    const updateParams = (updates: Record<string, string | null>) => {
        router.push(buildFilterParams(searchParams, updates));
    };

    const applyPriceRange = () => {
        updateParams({ minPrice: minInput || null, maxPrice: maxInput || null });
        setPriceOpen(false);
    };

    const clearAll = () => {
        setMinInput("");
        setMaxInput("");
        setPriceOpen(false);
        setCategoryOpen(false);
        updateParams({ minPrice: null, maxPrice: null, minRating: null, category: null, search: null });
    };

    return (
        <div className="flex flex-col gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2 py-3 border-b border-gray-100 relative">
                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500 shrink-0 mr-2">
                    <SlidersHorizontalIcon className="w-4 h-4" />
                    Filter
                </span>

                <Button
                    variant={activeMinPrice || activeMaxPrice ? "filter-active" : "filter"}
                    size="sm"
                    onClick={() => {
                        setPriceOpen(!priceOpen);
                        setCategoryOpen(false);
                    }}
                    className="flex items-center gap-1.5"
                >
                    <TagIcon className="w-3.5 h-3.5" />
                    Price
                    <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
                </Button>

                <div className="relative" ref={categoryRef}>
                    <Button
                        variant={activeCategory ? "filter-active" : "filter"}
                        size="sm"
                        onClick={() => {
                            setCategoryOpen(!categoryOpen);
                            setPriceOpen(false);
                        }}
                        className="flex items-center gap-1.5"
                    >
                        <LayoutGridIcon className="w-3.5 h-3.5" />
                        {activeCategory ? <span className="capitalize">{activeCategory}</span> : "Category"}
                        <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                    </Button>

                    {categoryOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-100">
                            <button
                                onClick={() => {
                                    updateParams({ category: null });
                                    setCategoryOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${!activeCategory ? 'font-bold text-primary' : 'text-gray-700'}`}
                            >
                                All Categories
                            </button>
                            <div className="h-px bg-gray-100 my-1" />
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        updateParams({ category: cat });
                                        setCategoryOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-50 transition-colors ${activeCategory === cat ? 'font-bold text-primary' : 'text-gray-700'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-px h-5 bg-gray-200 mx-1" />

                <div className="flex flex-wrap items-center gap-2">
                    {RATING_OPTIONS.map((opt) => (
                        <Button
                            key={opt.value}
                            variant={activeMinRating === opt.value ? "filter-active" : "filter"}
                            size="sm"
                            onClick={() => updateParams({ minRating: activeMinRating === opt.value ? null : opt.value })}
                        >
                            {opt.label} ★
                        </Button>
                    ))}
                </div>

                {hasActiveFilters && (
                    <Button
                        variant="filter"
                        size="sm"
                        onClick={clearAll}
                        className="flex items-center gap-1 ml-auto text-red-500 hover:text-red-600"
                    >
                        <XIcon className="w-3.5 h-3.5" />
                        Clear All
                    </Button>
                )}
            </div>

            {priceOpen && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <span className="text-sm font-bold text-gray-700">Set Price Range</span>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={minInput}
                                onChange={e => setMinInput(e.target.value)}
                                className="w-24 pl-7 pr-3 py-1.5 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>
                        <span className="text-gray-400">—</span>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxInput}
                                onChange={e => setMaxInput(e.target.value)}
                                className="w-24 pl-7 pr-3 py-1.5 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>
                        <Button variant="primary" size="sm" onClick={applyPriceRange} className="ml-2">
                            Apply
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}