import { Product, SortField, SortOrder } from "@/types/product";

// Added filter parameters to your function
export const getAllProducts = async (
  sortField?: SortField, 
  sortOrder: SortOrder = "asc",
  minPrice?: number,
  maxPrice?: number,
  minRating?: number
) => {
  const url = `${process.env.SERVER_URL}/products?sort=${sortOrder}`;
  let products: Product[] = await fetch(url, { cache: "no-store" })
    .then((res) => res.json());

  if (minPrice) {
    products = products.filter(p => p.price >= minPrice);
  }

  if (maxPrice) {
    products = products.filter(p => p.price <= maxPrice);
  }
  
  if (minRating) {
    products = products.filter(p => p.rating.rate >= minRating);
  }

  if (!sortField) return products;

  const getValue = (p: Product) => sortField === "rating" ? p.rating.rate : p[sortField];

  return products.sort((a, b) => {
    const [aVal, bVal] = [getValue(a), getValue(b)];
    const order = sortOrder === "asc" ? 1 : -1;

    return typeof aVal === "string"
      ? aVal.localeCompare(bVal as string) * order
      : ((aVal as number) - (bVal as number)) * order;
  });
}
export const getProductById = async (id: number): Promise<Product> => {
    return fetch(`${process.env.SERVER_URL}/products/${id}`, { cache: "no-store" }).then((res) => res.json());
};