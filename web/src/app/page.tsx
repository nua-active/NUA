import Image from "next/image";
import { Container } from "@/components/Container";
import { BRAND } from "@/lib/brand";
import { ButtonAnchor, ButtonLink } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { isSanityConfigured, sanityFetch } from "@/sanity/lib/fetch";
import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import type { Category, Product } from "@/sanity/lib/types";

export default function Home() {
  const configured = isSanityConfigured();

  return (
    <main className="flex-1 gradient-ambient">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 sm:py-20 overflow-hidden">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 text-left">
              <div className="inline-flex">
                <span className="rounded-full bg-white/60 backdrop-blur-sm border border-brand-rose/40 px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-ink/80">
                  ✨ Nueva Temporada · NUA Activewear
                </span>
              </div>
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-brand-ink leading-[1.15] sm:leading-[1.1] font-display">
                {BRAND.home.heroTitle.split(",")[0]}
                <span className="block text-brand-rose italic font-medium mt-1 font-display">
                  {BRAND.home.heroTitle.split(",")[1] || "más cerca."}
                </span>
              </h1>
              <p className="text-sm sm:text-lg leading-relaxed text-foreground/80 max-w-xl">
                {BRAND.home.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <ButtonLink href="/catalogo" className="w-full sm:w-auto px-8 py-4 text-xs tracking-wider uppercase font-bold text-center">
                  {BRAND.ui.ctaSecondary}
                </ButtonLink>
                <ButtonAnchor
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="w-full sm:w-auto px-8 py-4 text-xs tracking-wider uppercase font-bold text-center bg-white/40 hover:bg-white/80"
                >
                  Ver Instagram
                </ButtonAnchor>
              </div>

              {!configured ? (
                <div className="rounded-2xl border border-brand-rose/30 bg-white/60 backdrop-blur-sm p-4 text-[11px] text-foreground/70 max-w-xl mt-2">
                  Para ver productos reales de tu catálogo, recordá configurar Sanity en tu `.env.local` con 
                  `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET`.
                </div>
              ) : null}
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-peach/40 to-brand-rose/40 rounded-full blur-3xl opacity-75 -z-10 animate-pulse duration-[8000ms]" />
              <div className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-md rounded-[32px] overflow-hidden shadow-xl border border-white/60 bg-brand-sand/30">
                <Image
                  src="/hero-activewear.png"
                  alt="NUA Activewear Colección Pasteles"
                  fill
                  className="object-cover hover:scale-102 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 280px, 40vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Como Comprar - Vidriera Digital Section */}
      <section className="py-12 sm:py-16 bg-white/50 border-y border-border/25 backdrop-blur-md">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-ink font-display italic">
              Cómo comprar en NUA
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-foreground/70">
              Somos una vidriera virtual. Elegís lo que te gusta en la web y coordinás el pedido directamente por WhatsApp.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-8 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="relative flex flex-row sm:flex-col items-start gap-4 p-5 rounded-2xl sm:rounded-3xl border border-border/30 bg-white/40 shadow-sm transition hover:shadow-md">
              <div className="text-3xl sm:text-4xl font-extrabold font-display italic text-brand-rose/80 shrink-0">
                01
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-brand-ink text-sm sm:text-base">Elegí tu prenda</h3>
                <p className="text-xs leading-relaxed text-foreground/70">
                  Explorá el catálogo online con fotos reales, colores pasteles y talles actualizados.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-row sm:flex-col items-start gap-4 p-5 rounded-2xl sm:rounded-3xl border border-border/30 bg-white/40 shadow-sm transition hover:shadow-md">
              <div className="text-3xl sm:text-4xl font-extrabold font-display italic text-brand-peach/80 shrink-0">
                02
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-brand-ink text-sm sm:text-base">Seleccioná talle</h3>
                <p className="text-xs leading-relaxed text-foreground/70">
                  Elegí el talle que buscás dentro de la ficha de producto para consultar su disponibilidad.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-row sm:flex-col items-start gap-4 p-5 rounded-2xl sm:rounded-3xl border border-border/30 bg-white/40 shadow-sm transition hover:shadow-md">
              <div className="text-3xl sm:text-4xl font-extrabold font-display italic text-brand-lilac/80 shrink-0">
                03
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="flex items-center gap-2 font-bold text-brand-ink text-sm sm:text-base">
                  <WhatsAppIcon size={20} />
                  Escribinos por WhatsApp
                </h3>
                <p className="text-xs leading-relaxed text-foreground/70">
                  Tocá el botón para enviarnos tu consulta. Te asesoramos de manera personalizada para coordinar el pago y envío.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProductsPreview configured={configured} />
      <Testimonials />
    </main>
  );
}

async function ProductsPreview({ configured }: { configured: boolean }) {
  if (!configured) {
    return (
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-ink font-display italic">
                {BRAND.home.sections.featured}
              </h2>
              <div className="text-xs text-foreground/60 mt-1">
                Nuestra selección recomendada de indumentaria deportiva.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-border/30 bg-white/40 h-[360px] animate-pulse"
              />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  const [products, categories] = await Promise.all([
    sanityFetch<Product[]>(PRODUCTS_QUERY),
    sanityFetch<Category[]>(CATEGORIES_QUERY),
  ]);

  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const newest = products.slice(0, 8);
  const displayedProducts = featured.length ? featured : newest;

  return (
    <>
      <section className="py-16">
        <Container>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-ink font-display italic">
                {BRAND.home.sections.featured}
              </h2>
              <div className="text-xs text-foreground/60 mt-1">
                Prendas destacadas seleccionadas especialmente para vos.
              </div>
            </div>
            <ButtonLink href="/catalogo" variant="secondary" className="hidden sm:inline-flex bg-white/50 border-border/30 hover:bg-white text-xs uppercase tracking-widest font-bold">
              Ver Catálogo Completo
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <ButtonLink href="/catalogo" variant="secondary" className="w-full bg-white/50 border-border/30 text-xs uppercase tracking-widest font-bold">
              Ver Catálogo Completo
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white/70 border-t border-border/20 backdrop-blur-sm">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-ink font-display italic">
              {BRAND.home.sections.categories}
            </h2>
            <div className="text-sm text-foreground/75 mt-2">
              Buscá por tu tipo de prenda favorita
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
            {categories.map((c, i) => {
              const bgColors = [
                "border-brand-rose/70 hover:bg-brand-rose/25",
                "border-brand-peach/80 hover:bg-brand-peach/30",
                "border-brand-lilac/80 hover:bg-brand-lilac/30",
                "border-brand-sage/80 hover:bg-brand-sage/30",
              ];
              const colorClass = bgColors[i % bgColors.length];
              return (
                <ButtonLink
                  key={c._id}
                  href={`/catalogo?categoria=${encodeURIComponent(c.slug)}`}
                  variant="secondary"
                  className={`${colorClass} min-h-12 rounded-xl border-2 !bg-white px-4 py-3 text-center text-xs font-extrabold uppercase tracking-wide !text-brand-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:min-w-32 sm:rounded-full sm:px-6`}
                >
                  {c.name}
                </ButtonLink>
              );
            })}
            {categories.length === 0 ? (
              <div className="text-xs text-foreground/60">
                Aún no hay categorías cargadas.
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </>
  );
}
