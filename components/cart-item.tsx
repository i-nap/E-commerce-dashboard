"use client";

import Image from "next/image";
import { Trash2Icon, MinusIcon, PlusIcon } from "lucide-react";
import { CartItem as CartItemType } from "@/types/product";
import { useCart } from "@/context/cart-context";

interface Props {
    item: CartItemType;
}

export default function CartItem({ item }: Props) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <li className="flex gap-4 py-5 border-b border-gray-100 last:border-0">
            <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                />
            </div>

            <div className="flex flex-1 flex-col gap-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                    {item.title}
                </p>
                <p className="text-xs text-gray-500 capitalize">{item.category}</p>

                <div className="flex items-center justify-between mt-auto pt-1">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex items-center justify-center w-7 h-7 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-40"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900 select-none">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex items-center justify-center w-7 h-7 text-gray-500 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                        >
                            <Trash2Icon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
