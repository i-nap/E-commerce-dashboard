import { SortOption } from "@/types/product";

export const sortOptions: Omit<SortOption, "order">[] = [
    { label: "Price",  field: "price"  },
    { label: "Rating", field: "rating" },
    { label: "Name",   field: "title"  },
];