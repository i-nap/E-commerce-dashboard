"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, XIcon, Loader2 } from "lucide-react"; // Import Loader2
import { buildFilterParams } from "@/lib/filter-params";
import { SearchBarProps } from "@/types/product";

export default function SearchBar({ activeSearch }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(activeSearch ?? "");
    const [isPending, startTransition] = useTransition();
    const [isTyping, setIsTyping] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const push = (val: string) => {
        setIsTyping(false);
        startTransition(() => {
            router.push(buildFilterParams(searchParams, { search: val || null }));
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
        setIsTyping(true);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => push(val), 400);
    };

    const handleClear = () => {
        setValue("");
        setIsTyping(false);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        push("");
    };

    const showLoader = isTyping || isPending;

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

            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {showLoader && (
                    <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                )}

                {value && !showLoader && (
                    <button
                        onClick={handleClear}
                        className="text-gray-400 hover:text-gray-600 transition-opacity"
                    >
                        <XIcon className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
}