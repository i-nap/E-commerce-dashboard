import { Product } from "@/types/product";

export const getAllProducts = async (): Promise<Product[]> => {
  return fetch(`${process.env.SERVER_URL}/products`, { cache: "no-store" })
    .then((res) => res.json());
};

export const getCategories = async (): Promise<string[]> => {
  return fetch(`${process.env.SERVER_URL}/products/categories`, { cache: "force-cache" })
    .then((res) => res.json());
};

export const getProductById = async (id: number): Promise<Product> => {
  return fetch(`${process.env.SERVER_URL}/products/${id}`, { cache: "no-store" })
    .then((res) => res.json());
};
