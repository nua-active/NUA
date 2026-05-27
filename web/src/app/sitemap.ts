import type { MetadataRoute } from "next";
import { isSanityConfigured, sanityFetch } from "@/sanity/lib/fetch";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import type { Product } from "@/sanity/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const base = siteUrl ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/catalogo`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/contacto`, changeFrequency: "monthly", priority: 0.6 },
  ];

  if (!isSanityConfigured()) return staticRoutes;

  const products = await sanityFetch<Product[]>(PRODUCTS_QUERY);
  const productRoutes = products.map((p) => ({
    url: `${base}/producto/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}

