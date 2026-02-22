"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "@/types/product";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import Button from "./button";
import { StarIcon, CheckIcon } from "lucide-react";

export default function ProductCard({ product }: ProductCardProps) {
    const { handleAdd, added } = useAddToCart();

    return (
        <div className="w-full max-w-85 flex flex-col gap-3 h-full">

            <Link href={`/products/${product.id}`} className="flex flex-col gap-3 flex-1 group">
            <div className="relative w-full aspect-square bg-[#f4f4f5] rounded-3xl flex items-center justify-center p-8 overflow-hidden">
                <span className="absolute z-10 top-4 right-4 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                    {product.category}
                </span>

                <div className="relative w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                </div>
            </div>

            <div className="flex flex-col flex-1 px-1">
                <h2 className="text-md md:text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary/70 transition-colors">
                    {product.title}
                </h2>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <StarIcon className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b] mb-0.5" />
                        <span className="text-sm font-bold text-gray-700">{product.rating.rate}</span>
                    </div>

                    <span className="text-lg md:text-xl font-bold text-gray-900">
                        ${product.price}
                    </span>
                </div>
            </div>
            </Link>

            <div className="flex items-center gap-3 px-1">
                <Button size="md" className="flex-1" onClick={() => handleAdd(product)}>
                    {added ? (
                        <span className="inline-flex items-center gap-1.5">
                            <CheckIcon className="w-4 h-4" /> Added
                        </span>
                    ) : (
                        "Add to Cart"
                    )}
                </Button>
            </div>

        </div>
    );
}