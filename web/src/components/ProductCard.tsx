import Image from "next/image";
import Link from "next/link";
import { Product } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { Price } from "@/components/Price";
import { ProductImagePlaceholder } from "@/components/ProductImagePlaceholder";
import { buildProductWhatsAppMessage, getWhatsAppHref } from "@/lib/whatsapp";

function getInStockSizes(product: Product) {
  const variants = product.variants ?? [];
  return variants
    .filter((v) => typeof v.stock === "number" && v.stock > 0)
    .map((v) => v.size)
    .filter(Boolean);
}

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];
  const sizes = getInStockSizes(product);
  const pageUrl =
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/producto/${product.slug}`
      : undefined;
  const msg = buildProductWhatsAppMessage({
    productTitle: product.title,
    url: pageUrl,
  });

  return (
    <div className="group rounded-[28px] border border-border/20 bg-white overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <Link href={`/producto/${product.slug}`} className="block relative overflow-hidden aspect-[4/5] bg-brand-sand/10">
        {image ? (
          <Image
            src={urlFor(image).width(900).height(1125).quality(85).url()}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <ProductImagePlaceholder title={product.title} size="card" />
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-2 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/producto/${product.slug}`} className="min-w-0 flex-1">
              <div className="font-extrabold text-sm text-brand-ink truncate hover:underline underline-offset-4 transition-all">
                {product.title}
              </div>
            </Link>
            <div className="text-sm font-black text-brand-ink shrink-0">
              <Price value={product.price} currency={product.currency} />
            </div>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">
            {product.category?.name ?? "Activewear"}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {sizes.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {sizes.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center justify-center rounded-lg bg-brand-sand/40 border border-border/20 px-2 py-0.5 text-[9px] font-bold text-brand-ink/80 uppercase"
                >
                  Talle {s}
                </span>
              ))}
              {sizes.length > 4 ? (
                <span className="text-[9px] text-foreground/50 font-bold self-center">...</span>
              ) : null}
            </div>
          ) : (
            <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">Sin stock</div>
          )}

          <a
            href={getWhatsAppHref(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-2xl bg-brand-ink text-white py-2.5 text-xs font-bold uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.028 14.11 1.002 11.99 1.002c-5.448 0-9.87 4.372-9.874 9.802-.001 1.73.469 3.414 1.36 4.916l-.993 3.629 3.75-.983zm11.234-7.234c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.723.16-.214.32-.83.1.04-1.02 1.1-.19.215-.38.215-.7 0-.32-.16-1.39-.64-2.56-.13-.31-.27-.42-.4-.42H11.2c-.37 0-.98.14-1.49.7-.51.56-1.95 1.9-1.95 4.63s2 5.37 2.28 5.75c.28.38 3.91 5.97 9.48 8.37 1.32.57 2.36.92 3.16 1.17 1.33.42 2.54.36 3.5.22 1.07-.16 3.28-1.34 3.74-2.63.46-1.29.46-2.4.32-2.63-.14-.23-.52-.39-.84-.55z"/>
            </svg>
            Consultar
          </a>
        </div>
      </div>
    </div>
  );
}

