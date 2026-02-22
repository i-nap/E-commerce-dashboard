"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FilterBarProps } from "@/types/product";
import { SlidersHorizontalIcon, XIcon, TagIcon, StarIcon } from "lucide-react";

const RATING_OPTIONS = [
    { label: "2+", value: "2" },
    { label: "3+", value: "3" },
    { label: "4+", value: "4" },
];

export default function FilterBar({ activeMinPrice, activeMaxPrice, activeMinRating }: FilterBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minInput, setMinInput] = useState(activeMinPrice ?? "");
    const [maxInput, setMaxInput] = useState(activeMaxPrice ?? "");
    const [priceOpen, setPriceOpen] = useState(!!(activeMinPrice || activeMaxPrice));

    const hasActiveFilters = !!(activeMinPrice || activeMaxPrice || activeMinRating);

    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        for (const [key, val] of Object.entries(updates)) {
            if (val === null || val === "") params.delete(key);
            else params.set(key, val);
        }
        router.push(`?${params.toString()}`);
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
        updateParams({ minPrice: null, maxPrice: null, minRating: null });
    };

    return (
        <div className="flex flex-col gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-3 py-3 border-y border-gray-100">
                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500 shrink-0">
                    <SlidersHorizontalIcon className="w-4 h-4" />
                    Filter
                </span>

                {/* Price toggle button */}
                <button
                    onClick={() => setPriceOpen(o => !o)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer
                        ${priceOpen || activeMinPrice || activeMaxPrice
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                >
                    <TagIcon className="w-3.5 h-3.5" />
                    Price
                    {(activeMinPrice || activeMaxPrice) && (
                        <span className="ml-1 text-xs opacity-80">
                            {activeMinPrice ? `$${activeMinPrice}` : ""}
                            {activeMinPrice && activeMaxPrice ? " – " : ""}
                            {activeMaxPrice ? `$${activeMaxPrice}` : ""}
                        </span>
                    )}
                </button>

                <div className="w-px h-5 bg-gray-200 hidden sm:block" />

                {/* Rating filters */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                        <StarIcon className="w-3.5 h-3.5 fill-gray-300 text-gray-300" />
                    </span>
                    {RATING_OPTIONS.map((opt) => {
                        const isActive = activeMinRating === opt.value;
                        return (
                            <button
                                key={opt.value}
                                onClick={() => handleRating(opt.value)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer
                                    ${isActive ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                            >
                                {opt.label} ★
                            </button>
                        );
                    })}
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={clearAll}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer ml-auto"
                    >
                        <XIcon className="w-3.5 h-3.5" />
                        Clear
                    </button>
                )}
            </div>

            {/* Price range box */}
            {priceOpen && (
                <div className="flex flex-wrap items-center gap-3 px-1">
                    <span className="text-sm text-gray-500 font-medium">Price range</span>
                    <div className="flex items-center gap-2">
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
                        <button
                            onClick={applyPriceRange}
                            className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
                        >
                            Apply
                        </button>
                        {(activeMinPrice || activeMaxPrice) && (
                            <button
                                onClick={clearPrice}
                                className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
