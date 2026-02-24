import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";

export function useAddToCart(defaultQuantity = 1) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (product: Product, quantity?: number) => {
    const finalQuantity = quantity ?? defaultQuantity;

    setError(null);
    setAdded(false);

    try {
      if (!product || !product.id) {
        throw new Error("Invalid product data.");
      }

      if (finalQuantity <= 0) {
        throw new Error("Quantity must be at least 1.");
      }

      addItem(product, finalQuantity);

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add item to cart.";
      setError(errorMessage);

      console.error("Cart Hook Error:", err);

      setTimeout(() => setError(null), 3000);
    }
  };

  return { handleAdd, added, error };
}
