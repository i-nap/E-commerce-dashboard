import Image from "next/image";
import { ProductCardProps } from "@/types/product";
import Button from "./button";
import { StarIcon } from "lucide-react";

export default function ProductDetail({ product }: ProductCardProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Image */}
            <div className="w-full lg:w-1/2 aspect-square bg-[#f4f4f5] rounded-3xl flex items-center justify-center p-12 shrink-0">
                <div className="relative w-full h-full">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5 flex-1 pt-2">
                <span className="w-fit bg-muted border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-1.5 rounded-full">
                    {product.category}
                </span>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                    {product.title}
                </h1>

                <div className="flex items-center gap-2">
                    <StarIcon className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
                    <span className="font-bold text-gray-800">{product.rating.rate}</span>
                    <span className="text-gray-500 text-sm">({product.rating.count} Reviews)</span>
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                <div className="flex items-center gap-4 mt-2">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <Button size="lg" className="flex-1 sm:flex-none">Add to Cart</Button>
                    <Button size="lg" variant="outline">Wishlist</Button>
                </div>
            </div>
        </div>
    );
}
