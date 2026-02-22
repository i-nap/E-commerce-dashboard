"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontalIcon, XIcon, TagIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { SortBarProps, FilterBarProps } from "@/types/product";
import { sortOptions } from "@/constants/sort-options";
import { RATING_OPTIONS } from "@/constants/filter-options";
import Button from "./button";
import { buildFilterParams, buildSortHref, clearSortHref } from "@/lib/filter-params";

type Props = SortBarProps & FilterBarProps;

export default function MobileFilterDrawer({ activeField, activeOrder, activeMinPrice, activeMaxPrice, activeMinRating, activeCategory, categories }: Props) {
    const [open, setOpen] = useState(false);
    const [minInput, setMinInput] = useState(activeMinPrice ?? "");
    const [maxInput, setMaxInput] = useState(activeMaxPrice ?? "");
    const [priceOpen, setPriceOpen] = useState(!!(activeMinPrice || activeMaxPrice));

    const router = useRouter();
    const searchParams = useSearchParams();

    const hasActiveFilters = !!(activeField || activeMinPrice || activeMaxPrice || activeMinRating || activeCategory);

    const updateParams = (updates: Record<string, string | null>) => {
        router.push(buildFilterParams(searchParams, updates));
    };

    const applyPriceRange = () => {
        updateParams({ minPrice: minInput || null, maxPrice: maxInput || null });
        setOpen(false);
    };

    const handleRating = (value: string) => {
        updateParams({ minRating: activeMinRating === value ? null : value });
        setOpen(false);
    };

    const clearAll = () => {
        setMinInput("");
        setMaxInput("");
        setPriceOpen(false);
        updateParams({ minPrice: null, maxPrice: null, minRating: null, category: null, sortField: null, sortOrder: null });
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="filter"
                size="sm"
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 relative"
            >
                <SlidersHorizontalIcon className="w-4 h-4" />
                Filters & Sort
                {hasActiveFilters && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary" />
                )}
            </Button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <span className="text-base font-semibold text-gray-900">Filters & Sort</span>
                    <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="p-1.5">
                        <XIcon className="w-5 h-5 text-gray-500" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-7">

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Sort by</span>
                        <div className="flex flex-col gap-2">
                            {sortOptions.map((opt) => {
                                const isActive = activeField === opt.field;
                                return (
                                    <Link
                                        key={opt.field}
                                        href={buildSortHref(searchParams, opt.field, activeField, activeOrder)}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors
                                            ${isActive ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
                                    >
                                        {opt.label}
                                        {isActive && (
                                            activeOrder === "asc"
                                                ? <ArrowUpIcon className="w-4 h-4" />
                                                : <ArrowDownIcon className="w-4 h-4" />
                                        )}
                                    </Link>
                                );
                            })}
                            {activeField && (
                                <Link
                                    href={clearSortHref(searchParams)}
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 text-center transition-colors"
                                >
                                    Clear sort
                                </Link>
                            )}
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Price range</span>
                            <Button
                                variant="filter"
                                size="sm"
                                onClick={() => setPriceOpen(o => !o)}
                                className="flex items-center gap-1"
                            >
                                <TagIcon className="w-3.5 h-3.5" />
                                {priceOpen ? "Hide" : "Set range"}
                            </Button>
                        </div>
                        {(activeMinPrice || activeMaxPrice) && (
                            <span className="text-sm text-gray-600 font-medium">
                                {activeMinPrice ? `$${activeMinPrice}` : ""}
                                {activeMinPrice && activeMaxPrice ? " – " : ""}
                                {activeMaxPrice ? `$${activeMaxPrice}` : ""}
                            </span>
                        )}
                        {priceOpen && (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                        <input
                                            type="number"
                                            min={0}
                                            placeholder="Min"
                                            value={minInput}
                                            onChange={e => setMinInput(e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <span className="text-gray-400">–</span>
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                        <input
                                            type="number"
                                            min={0}
                                            placeholder="Max"
                                            value={maxInput}
                                            onChange={e => setMaxInput(e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <Button variant="primary" size="sm" onClick={applyPriceRange} className="w-full">
                                    Apply price range
                                </Button>
                            </div>
                        )}
                    </div>

                    <hr className="border-gray-100" />

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Min rating</span>
                        <div className="flex flex-col gap-2">
                            {RATING_OPTIONS.map((opt) => {
                                const isActive = activeMinRating === opt.value;
                                return (
                                    <Button
                                        key={opt.value}
                                        variant={isActive ? "filter-active" : "filter"}
                                        size="sm"
                                        onClick={() => handleRating(opt.value)}
                                        className="w-full justify-between"
                                    >
                                        {opt.label} ★
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Category</span>
                        <div className="flex flex-col gap-2">
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat;
                                return (
                                    <Button
                                        key={cat}
                                        variant={isActive ? "filter-active" : "filter"}
                                        size="sm"
                                        onClick={() => { updateParams({ category: isActive ? null : cat }); setOpen(false); }}
                                        className="w-full justify-start capitalize"
                                    >
                                        {cat}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="px-5 py-4 border-t border-gray-100">
                        <Button variant="filter" size="sm" onClick={clearAll} className="w-full flex items-center gap-2">
                            <XIcon className="w-4 h-4" />
                            Clear all
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
