"use client";

import Link from "next/link";
import { SortBarProps, SortField, SortOrder } from "@/types/product";
import { sortOptions } from "@/constants/sort-options";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export default function SortBar({ activeField, activeOrder }: SortBarProps) {
    const getNextOrder = (field: SortField): SortOrder => {
        if (activeField === field) return activeOrder === "asc" ? "desc" : "asc";
        return "asc";
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            {sortOptions.map((opt) => {
                const isActive = activeField === opt.field;
                const nextOrder = getNextOrder(opt.field);

                return (
                    <Link
                        key={opt.field}
                        href={`?sortField=${opt.field}&sortOrder=${nextOrder}`}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${isActive ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                    >
                        {opt.label}
                        {isActive && (
                            activeOrder === "asc"
                                ? <ArrowUpIcon className="w-3.5 h-3.5" />
                                : <ArrowDownIcon className="w-3.5 h-3.5" />
                        )}
                    </Link>
                );
            })}
            {activeField && (
                <Link
                    href="/products"
                    className="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors"
                >
                    Clear
                </Link>
            )}
        </div>
    );
}
