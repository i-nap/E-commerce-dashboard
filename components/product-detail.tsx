import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "@/types/product";
import Button from "./button";
import { StarIcon, ArrowLeftIcon } from "lucide-react";

export default function ProductDetail({ product }: ProductCardProps) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6"
            >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Products
            </Link>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
        
            <div className="w-full md:w-1/2 aspect-square bg-[#f4f4f5] rounded-2xl md:rounded-3xl flex items-center justify-center p-6 sm:p-10 shrink-0">
                <div className="relative w-full h-full">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 flex-1 w-full pt-2 lg:pt-8">
                
                <div className="flex flex-col gap-3">
                    <span className="w-fit bg-white border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-sm">
                        {product.category}
                    </span>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight text-balance">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-2 mt-1">
                        <StarIcon className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
                        <span className="font-bold text-gray-900 text-lg">{product.rating.rate}</span>
                        <span className="text-gray-500 font-medium">
                            ({product.rating.count} Reviews)
                        </span>
                    </div>
                </div>

                <hr className="border-gray-200" />

                <div className="prose prose-sm sm:prose-base text-gray-600 leading-relaxed">
                    <p>{product.description}</p>
                </div>
                <div className="flex flex-col gap-4 mt-2 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Price</span>
                        <span className="text-3xl md:text-4xl font-black text-gray-900">
                            ${product.price}
                        </span>
                    </div>
                    <Button size="lg" className="w-full">
                        Add to Cart
                    </Button>
                </div>

            </div>
        </div>
        </div>
    );
}