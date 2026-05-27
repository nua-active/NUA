import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Price } from "@/components/Price";
import { ButtonAnchor, ButtonLink } from "@/components/Button";
import { BRAND } from "@/lib/brand";
import { buildProductWhatsAppMessage, getWhatsAppHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { isSanityConfigured, sanityFetch } from "@/sanity/lib/fetch";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { Product } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { ProductImagePlaceholder } from "@/components/ProductImagePlaceholder";
import { ProductSizeConsultation } from "@/components/ProductSizeConsultation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  if (!isSanityConfigured()) {
    return { title: "Producto" };
  }

  const { slug } = await params;
  const product = await sanityFetch<Product | null>(PRODUCT_BY_SLUG_QUERY, {
    slug,
  });
  if (!product) return { title: "Producto" };

  const title = product.title;
  const description =
    product.description?.slice(0, 160) ??
    "Consultá talles disponibles y comprá por WhatsApp.";

  const image = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(630).quality(90).url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} · ${BRAND.name}`,
      description,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const configured = isSanityConfigured();
  if (!configured) notFound();

  const { slug } = await params;
  const product = await sanityFetch<Product | null>(PRODUCT_BY_SLUG_QUERY, {
    slug,
  });
  if (!product) notFound();

  const variants = (product.variants ?? []).slice().sort((a, b) =>
    a.size.localeCompare(b.size, "es")
  );
  const inStock = variants.filter((v) => typeof v.stock === "number" && v.stock > 0);

  const pageUrl =
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/producto/${product.slug}`
      : undefined;

  const genericMsg = buildProductWhatsAppMessage({
    productTitle: product.title,
    url: pageUrl,
  });

  return (
    <main className="py-12 gradient-ambient flex-1">
      <Container>
        {/* Navegación y retroceso */}
        <div className="flex items-center justify-between gap-4 border-b border-border/10 pb-4">
          <ButtonLink href="/catalogo" variant="secondary" className="px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/50 border-border/30 hover:bg-white transition-all shadow-none">
            ← Volver al catálogo
          </ButtonLink>
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest text-brand-ink hover:underline decoration-brand-rose underline-offset-4"
          >
            Instagram NUA
          </a>
        </div>

        {/* Bloque de Producto */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* Columna de Imagen */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-lg rounded-[32px] overflow-hidden shadow-lg border border-white/60 bg-brand-sand/20">
              {product.images?.[0] ? (
                <Image
                  src={urlFor(product.images[0]).width(1200).height(1500).quality(90).url()}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <ProductImagePlaceholder title={product.title} size="detail" />
              )}
            </div>
          </div>

          {/* Columna de Detalles */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">
                {product.category?.name ?? "Activewear"}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-ink font-display italic leading-tight">
                {product.title}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-2xl font-black text-brand-ink">
                <Price value={product.price} currency={product.currency} />
              </div>
              {inStock.length ? (
                <span className="inline-flex items-center rounded-full bg-brand-sage/20 px-3 py-1 text-xs font-semibold text-brand-ink border border-brand-sage/40">
                  {inStock.length} talle(s) disponible(s)
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 border border-red-200">
                  Sin stock
                </span>
              )}
            </div>

            {product.description ? (
              <div className="border-t border-border/10 pt-4">
                <p className="text-sm leading-relaxed text-foreground/80">
                  {product.description}
                </p>
              </div>
            ) : null}

            {product.colors?.length ? (
              <div className="flex flex-wrap gap-2 items-center text-xs text-foreground/70">
                <span className="font-bold text-brand-ink uppercase tracking-wider">Colores:</span>
                {product.colors.map((c) => (
                  <span key={c} className="bg-white/60 px-2.5 py-1 rounded-full border border-border/30 font-semibold text-brand-ink">
                    {c}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Selector de talles y consultas */}
            {inStock.length ? (
              <ProductSizeConsultation
                pageUrl={pageUrl}
                productTitle={product.title}
                sizes={inStock.map((v) => v.size)}
              />
            ) : (
              <div className="rounded-[32px] border border-red-100 bg-red-50/50 backdrop-blur-md p-6 shadow-sm flex flex-col gap-4 text-xs text-foreground/80 leading-relaxed">
                <p>
                  No contamos con stock de esta prenda en este momento. Si querés, podés escribirnos de todas formas para consultar cuándo vuelve a ingresar o para que te avisemos en cuanto lo repongamos.
                </p>
                <ButtonAnchor
                  href={getWhatsAppHref(genericMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white bg-[#25d366] hover:bg-[#20ba5a] rounded-full shadow-md transition-all duration-300"
                >
                  <WhatsAppIcon size={18} />
                  Consultar igual por WhatsApp
                </ButtonAnchor>
              </div>
            )}

            {/* Aviso de Vidriera Digital */}
            <div className="rounded-2xl border border-brand-rose/20 bg-brand-rose/5 p-4 text-[11px] text-foreground/70 leading-relaxed flex flex-col gap-1.5">
              <span className="font-bold text-brand-ink uppercase tracking-widest">✨ Vidriera Digital NUA</span>
              <span>
                Este sitio funciona como un catálogo interactivo. Al hacer clic en los botones, te contactás directamente con nuestro equipo por WhatsApp para confirmar stock y coordinar el pago y envío. ¡Es fácil, seguro y personalizado!
              </span>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
