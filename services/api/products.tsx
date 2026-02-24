import { Product } from "@/types/product";
import { fetchWrapper } from "@/lib/fetchWrapper";

export const getAllProducts = async (): Promise<Product[]> => {
  return fetchWrapper<Product[]>("/products", { cache: "no-store" });
};

export const getCategories = async (): Promise<string[]> => {
  return fetchWrapper<string[]>("/products/categories", { cache: "force-cache" });
};

export const getProductById = async (id: number): Promise<Product> => {
  return fetchWrapper<Product>(`/products/${id}`, { cache: "no-store" });
};