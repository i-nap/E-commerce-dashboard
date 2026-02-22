import { Product, SortField, SortOrder } from "@/types/product";

export const getAllProducts = async (
  sortField?: SortField,
  sortOrder: SortOrder = "asc",
): Promise<Product[]> => {
  const url = `${process.env.SERVER_URL}/products?sort=${sortOrder}`;
  const products: Product[] = await fetch(url, { cache: "no-store" })
    .then((res) => res.json());

  if (!sortField) return products;

  const getValue = (p: Product) => sortField === "rating" ? p.rating.rate : p[sortField];

  return products.sort((a, b) => {
    const [aVal, bVal] = [getValue(a), getValue(b)];
    const order = sortOrder === "asc" ? 1 : -1;
    return typeof aVal === "string"
      ? aVal.localeCompare(bVal as string) * order
      : ((aVal as number) - (bVal as number)) * order;
  });
};

export const getCategories = async (): Promise<string[]> => {
  return fetch(`${process.env.SERVER_URL}/products/categories`, { cache: "force-cache" })
    .then((res) => res.json());
};

export const getProductById = async (id: number): Promise<Product> => {
  return fetch(`${process.env.SERVER_URL}/products/${id}`, { cache: "no-store" })
    .then((res) => res.json());
};
