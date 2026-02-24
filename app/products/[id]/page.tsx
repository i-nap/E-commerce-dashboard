import ProductDetail from "@/components/product-detail";
import { getProductById } from "@/services/api/products";
import { ProductDetailPageProps } from "@/types/product";
import { Metadata } from "next";

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(Number(id));

    if (!product) return { title: "Product Not Found" };

    return {
        title: product.title,
        description: product.description.slice(0, 160),
        openGraph: {
            title: product.title,
            description: product.description,
            images: [{ url: product.image, alt: product.title }],
            type: "article",
        },
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    const product = await getProductById(Number(id));

    if (!product) return <div>Product not found</div>;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title,
        "image": product.image,
        "description": product.description,
        "sku": `NEST-${product.id}`,
        "offers": {
            "@type": "Offer",
            "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/products/${product.id}`,
            "priceCurrency": "USD",
            "price": product.price,
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <div className="py-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <ProductDetail product={product} />
        </div>
    );
}