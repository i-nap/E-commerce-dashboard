"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="View cart"
    >
      <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
