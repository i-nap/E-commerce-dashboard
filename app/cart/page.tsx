"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBagIcon, ArrowLeftIcon, Trash2Icon, CheckCircleIcon, UserIcon, Loader2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/hooks/use-auth";
import CartItem from "@/components/cart-item";
import Button from "@/components/button";

export default function CartPage() {
    const { items, total, itemCount, clearCart } = useCart();
    const { isLoggedIn } = useAuth();
    const [checkedOut, setCheckedOut] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const checkoutButton = async () => {
        if (!isLoggedIn || isPending) return;

        setIsPending(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            clearCart();
            setCheckedOut(true);
        } catch (error) {
            console.error("Checkout failed:", error);
        } finally {
            setIsPending(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50">
                    <UserIcon className="w-10 h-10 text-blue-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Please login to use your cart</h1>
                    <p className="mt-2 text-gray-500 text-sm max-w-xs mx-auto">
                        To protect your items and provide a secure checkout, you need to be signed in to your account.
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Link href="/login">
                        <Button size="lg" className="w-full">
                            Login to Account
                        </Button>
                    </Link>
                    <Link href="/products" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                        Continue as Guest
                    </Link>
                </div>
            </div>
        );
    }

    if (checkedOut) {
        return (
            <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                    <CheckCircleIcon className="w-10 h-10 text-green-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order placed!</h1>
                    <p className="mt-1 text-gray-500 text-sm">
                        Thanks for your purchase. Your order is on its way.
                    </p>
                </div>
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 bg-gray-900 text-white hover:bg-gray-700 px-9 py-4 text-lg"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100">
                    <ShoppingBagIcon className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
                    <p className="mt-1 text-gray-500 text-sm">
                        Looks like you haven&apos;t added anything yet.
                    </p>
                </div>
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 bg-gray-900 text-white hover:bg-gray-700 px-9 py-4 text-lg"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="py-8 md:py-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-2"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        Shopping Cart
                        <span className="ml-2 text-base font-normal text-gray-400">
                            ({itemCount} {itemCount === 1 ? "item" : "items"})
                        </span>
                    </h1>
                </div>

                <button
                    onClick={clearCart}
                    disabled={isPending}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Clear cart"
                >
                    <Trash2Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">Clear all</span>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 w-full bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 shadow-xs">
                    <ul>
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </ul>
                </div>

                <aside className="w-full lg:w-80 shrink-0 bg-gray-50 border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-xs">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                    <div className="flex flex-col gap-2 text-sm text-gray-600">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between gap-2">
                                <span className="line-clamp-1 flex-1 text-gray-700">
                                    {item.title}
                                    <span className="text-gray-400 ml-1">×{item.quantity}</span>
                                </span>
                                <span className="shrink-0 font-medium text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4 border-gray-200" />

                    <div className="flex justify-between text-base font-bold text-gray-900 mb-5">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Button 
                        onClick={checkoutButton} 
                        size="lg" 
                        className="w-full flex items-center justify-center gap-2"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Checkout"
                        )}
                    </Button>

                    <p className="mt-3 text-center text-xs text-gray-400">
                        Taxes and shipping calculated at checkout
                    </p>
                </aside>
            </div>
        </div>
    );
}