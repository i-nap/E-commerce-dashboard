"use client";

import { useAddToCart } from "@/hooks/use-add-to-cart";
import Button from "./button";
import { CheckIcon, AlertCircleIcon, Loader2 } from "lucide-react"; // Added Loader2
import { AddToCartButtonProps } from "@/types/button";

export default function AddToCartButton({
    product,
    quantity = 1,
    className
}: AddToCartButtonProps) {
    const { handleAdd, added, error, isLoading } = useAddToCart();

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <Button
                variant={error ? "danger" : "primary"}
                onClick={() => handleAdd(product, quantity)}
                disabled={isLoading || added}
                className="relative overflow-hidden"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Adding...
                    </span>
                ) : error ? (
                    <span className="flex items-center gap-2">
                        <AlertCircleIcon className="w-5 h-5" /> Try Again
                    </span>
                ) : added ? (
                    <span className="flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" /> Added to Cart
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        Add to Cart
                    </span>
                )}
            </Button>

            {error && (
                <p className="text-xs text-red-600 font-semibold text-center animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
}