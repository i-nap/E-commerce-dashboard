"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";
import { buildFilterParams } from "@/lib/filter-params";
import { SearchBarProps } from "@/types/product";

export default function SearchBar({ activeSearch }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(activeSearch ?? "");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const push = (val: string) => {
        router.push(buildFilterParams(searchParams, { search: val || null }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => push(val), 400);
    };

    const handleClear = () => {
        setValue("");
        if (debounceRef.current) clearTimeout(debounceRef.current);
        push("");
    };

    return (
        <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Search products..."
                className="w-full pl-9 pr-8 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-primary transition-colors"
            />
            {value && (
                <button
                    onClick={handleClear}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <XIcon className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
}
