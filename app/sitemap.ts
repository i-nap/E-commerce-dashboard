import { StoreProduct } from "@/types/sitemap";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://nest-e-commerce-dashboard.vercel.app";
  const apiUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ?? "https://fakestoreapi.com";

  let productUrls: MetadataRoute.Sitemap = [];

  try {
    const response = await fetch(`${apiUrl}/products`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const products: StoreProduct[] = await response.json();

      productUrls = products
        .filter((product) => product.id)
        .map((product) => ({
          url: `${baseUrl}/products/${product.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.error("Sitemap fetch failed, skipping product URLs:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productUrls,
  ];
}
