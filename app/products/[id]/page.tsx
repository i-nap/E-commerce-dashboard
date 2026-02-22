import ProductDetail from "@/components/product-detail";
import { getProductById } from "@/services/api/products";
import { ProductDetailPageProps } from "@/types/product";

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    const product = await getProductById(Number(id));

    return (
        <div className="py-10">
            <ProductDetail product={product} />
        </div>
    );
}
