export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export type SortOrder = "asc" | "desc";
export type SortField = "price" | "title" | "rating" | "id";

export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  products: Product[];
}

export interface ProductPageProps {
  searchParams: Promise<{ sortField?: SortField; sortOrder?: SortOrder; page?: string; minPrice?: string; maxPrice?: string; minRating?: string; category?: string }>;
}

export interface SortOption {
  label: string;
  field: SortField;
  order: SortOrder;
}

export interface SortBarProps {
  activeField?: SortField;
  activeOrder?: SortOrder;
}

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

export interface FilterBarProps {
  activeMinPrice?: string;
  activeMaxPrice?: string;
  activeMinRating?: string;
  activeCategory?: string;
  categories: string[];
}
