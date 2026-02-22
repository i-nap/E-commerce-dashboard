import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";

export function useAddToCart(quantity = 1) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (product: Product) => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return { handleAdd, added };
}
