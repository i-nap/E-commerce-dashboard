"use client"
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import CartButton from "./cart-button";
import Link from "next/link";

export function Navbar() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/products" className="text-lg font-bold">Nest</Link>
                <div className="flex gap-2 items-center">
                    <CartButton />
                    {isLoggedIn ? (
                        <button onClick={logout} className="p-2 hover:bg-gray-100 rounded-full">
                            <LogOut size={20} />
                        </button>
                    ) : (
                        <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full">
                            <User size={20} />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}