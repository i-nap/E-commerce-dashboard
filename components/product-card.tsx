import Image from "next/image";
import { ProductCardProps } from "@/types/product";

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="w-full max-w-85 flex flex-col gap-4 h-full">

            <div className="relative w-full aspect-square bg-[#f4f4f5] rounded-3xl flex items-center justify-center p-8">
                <span className="absolute z-10 top-4 right-4 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                    {product.category}
                </span>

                <div className="relative w-full h-full">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 340px"
                    />
                </div>
            </div>

            <div className="flex flex-col flex-1 px-1">
                <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {product.title}
                </h2>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-4 h-4 text-[#f59e0b] mb-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold text-gray-700">{product.rating.rate}</span>
                        <span className="text-sm text-gray-500 font-medium">({product.rating.count} Reviews)</span>
                    </div>

                    <span className="text-2xl font-bold text-gray-900">
                        {product.price}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 px-1 mt-2">
                <button className="flex-1 bg-white border border-gray-200 text-gray-900 font-bold py-3 px-4 rounded-full text-sm hover:bg-gray-50 transition-colors">
                    Add to Cart
                </button>
                <button className="flex-1 bg-[#1a1a1a] text-white font-bold py-3 px-4 rounded-full text-sm hover:bg-black transition-colors">
                    Buy Now
                </button>
            </div>

        </div>
    );
}