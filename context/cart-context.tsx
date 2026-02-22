"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { CartContextType, CartItem, Product } from "@/types/product";


type CartAction =
  | { type: "ADD"; product: Product; quantity: number }
  | { type: "REMOVE"; id: number }
  | { type: "UPDATE_QTY"; id: number; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };


function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "HYDRATE":
      return action.items;

    case "ADD": {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
      }
      const { id, title, price, image, category } = action.product;
      return [
        ...state,
        { id, title, price, image, category, quantity: action.quantity },
      ];
    }

    case "REMOVE":
      return state.filter((item) => item.id !== action.id);

    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return state.filter((item) => item.id !== action.id);
      }
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      );

    case "CLEAR":
      return [];

    default:
      return state;
  }
}


const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: "ADD", product, quantity });

  const removeItem = (id: number) => dispatch({ type: "REMOVE", id });

  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", id, quantity });

  const clearCart = () => dispatch({ type: "CLEAR" });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
