import { SortField, SortOrder } from "@/types/product";

export function buildFilterParams(
    searchParams: URLSearchParams,
    updates: Record<string, string | null>
): string {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    for (const [key, val] of Object.entries(updates)) {
        if (val === null || val === "") params.delete(key);
        else params.set(key, val);
    }
    return `?${params.toString()}`;
}

export function buildSortHref(
    searchParams: URLSearchParams,
    field: SortField,
    activeField: SortField | undefined,
    activeOrder: SortOrder | undefined
): string {
    const nextOrder: SortOrder =
        activeField === field ? (activeOrder === "asc" ? "desc" : "asc") : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set("sortField", field);
    params.set("sortOrder", nextOrder);
    return `?${params.toString()}`;
}

export function clearSortHref(searchParams: URLSearchParams): string {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortField");
    params.delete("sortOrder");
    params.delete("page");
    return `?${params.toString()}`;
}
