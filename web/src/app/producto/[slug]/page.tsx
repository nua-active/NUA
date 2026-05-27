import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Price } from "@/components/Price";
import { ButtonAnchor, ButtonLink } from "@/components/Button";
import { BRAND } from "@/lib/brand";
import { buildProductWhatsAppMessage, getWhatsAppHref } from "@/lib/whatsapp";
import { isSanityConfigured, sanityFetch } from "@/sanity/lib/fetch";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { Product } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { ProductImagePlaceholder } from "@/components/ProductImagePlaceholder";

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
              <div className="rounded-[32px] border border-border/30 bg-white/50 backdrop-blur-md p-6 shadow-sm flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-ink">
                    1. Elegí tu talle para consultar
                  </div>
                  <div className="text-[11px] text-foreground/60">
                    Al seleccionar un talle se abrirá WhatsApp con una plantilla del pedido.
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {inStock.map((v) => {
                    const msg = buildProductWhatsAppMessage({
                      productTitle: product.title,
                      size: v.size,
                      url: pageUrl,
                    });
                    return (
                      <ButtonAnchor
                        key={v.size}
                        href={getWhatsAppHref(msg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        className="px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-white/80 border-brand-peach/40 hover:bg-brand-peach/30 text-brand-ink shadow-sm"
                      >
                        Talle {v.size}
                      </ButtonAnchor>
                    );
                  })}
                </div>

                <div className="border-t border-border/10 pt-4 flex flex-col gap-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-ink">
                    O consultanos de forma general:
                  </div>
                  <ButtonAnchor
                    href={getWhatsAppHref(genericMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white bg-[#25d366] hover:bg-[#20ba5a] rounded-full shadow-md transition-all duration-300"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.031 2c-5.506 0-9.975 4.47-9.975 9.977 0 1.758.459 3.472 1.33 4.982l-1.417 5.176 5.297-1.39c1.464.798 3.107 1.218 4.764 1.219h.004c5.507 0 9.977-4.47 9.977-9.978.002-2.67-1.037-5.18-2.92-7.065C17.21 3.038 14.7 2.003 12.031 2zm6.99 14.025c-.297.837-1.72 1.537-2.355 1.636-.576.09-1.326.167-2.126-.09-.5-.16-1.127-.417-1.93-.76-3.434-1.458-5.65-4.96-5.823-5.187-.172-.228-1.398-1.857-1.398-3.541 0-1.684.86-2.512 1.17-2.852.29-.317.76-.44 1.23-.44h.38c.36 0 .84-.04 1.21.84.38.91 1.29 3.15 1.41 3.39.12.24.12.52-.04.83-.16.31-.38.56-.56.76-.18.2-.38.45-.16.83.47.8 2.057 3.385 4.416 4.78.607.36 1.09.47 1.49.37.407-.1 1.297-.53 1.48-1.03.18-.5.18-.94.12-1.03-.06-.09-.24-.14-.52-.29z"/>
                    </svg>
                    {BRAND.ui.ctaPrimary}
                  </ButtonAnchor>
                </div>
              </div>
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
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.031 2c-5.506 0-9.975 4.47-9.975 9.977 0 1.758.459 3.472 1.33 4.982l-1.417 5.176 5.297-1.39c1.464.798 3.107 1.218 4.764 1.219h.004c5.507 0 9.977-4.47 9.977-9.978.002-2.67-1.037-5.18-2.92-7.065C17.21 3.038 14.7 2.003 12.031 2zm6.99 14.025c-.297.837-1.72 1.537-2.355 1.636-.576.09-1.326.167-2.126-.09-.5-.16-1.127-.417-1.93-.76-3.434-1.458-5.65-4.96-5.823-5.187-.172-.228-1.398-1.857-1.398-3.541 0-1.684.86-2.512 1.17-2.852.29-.317.76-.44 1.23-.44h.38c.36 0 .84-.04 1.21.84.38.91 1.29 3.15 1.41 3.39.12.24.12.52-.04.83-.16.31-.38.56-.56.76-.18.2-.38.45-.16.83.47.8 2.057 3.385 4.416 4.78.607.36 1.09.47 1.49.37.407-.1 1.297-.53 1.48-1.03.18-.5.18-.94.12-1.03-.06-.09-.24-.14-.52-.29z"/>
                  </svg>
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

