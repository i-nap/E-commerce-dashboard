import Link from "next/link";
import { PaginationProps } from "@/types/product";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getPageNumbers } from "@/lib/pagination";

export default function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
    const buildHref = (page: number | string) => {
        const params = new URLSearchParams();

        if (searchParams) {
            Object.entries(searchParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "" && value !== "undefined") {
                    params.set(key, String(value));
                }
            });
        }
        params.set("page", String(page));
        return `?${params.toString()}`;
    };

    const pages = getPageNumbers(currentPage, totalPages);

    return (
        <div className="flex items-center justify-center gap-1 sm:gap-2 mt-10 border-t border-primary/20 pt-6 flex-wrap">
            <Link
                href={buildHref(currentPage - 1)}
                aria-disabled={currentPage === 1}
                className={`p-2 rounded-full border transition-colors ${currentPage === 1 ? "pointer-events-none opacity-40 border-gray-200" : "border-gray-300 hover:bg-gray-50"}`}
            >
                <ChevronLeftIcon className="w-4 h-4" />
            </Link>

            {pages.map((page, i) =>
                page === "..." ? (
                    <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
                        ...
                    </span>
                ) : (
                    <Link
                        key={page}
                        href={buildHref(page)}
                        className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium border transition-colors ${page === currentPage ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                    >
                        {page}
                    </Link>
                )
            )}

            <Link
                href={buildHref(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
                className={`p-2 rounded-full border transition-colors ${currentPage === totalPages ? "pointer-events-none opacity-40 border-gray-200" : "border-gray-300 hover:bg-gray-50"}`}
            >
                <ChevronRightIcon className="w-4 h-4" />
            </Link>
        </div>
    );
}
