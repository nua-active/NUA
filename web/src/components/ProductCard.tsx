import Image from "next/image";
import Link from "next/link";
import { Product } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { Price } from "@/components/Price";
import { ProductImagePlaceholder } from "@/components/ProductImagePlaceholder";
import { buildProductWhatsAppMessage, getWhatsAppHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

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
            <WhatsAppIcon size={16} />
            Consultar
          </a>
        </div>
      </div>
    </div>
  );
}

